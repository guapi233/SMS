const router = require("koa-router")();
const { MajorModel } = require("../model/major");
const { ClassModel } = require("../model/class");
const { VacationModel } = require("../model/vacation");
const { PersonModel } = require("../model/person");
const { MessageModel, readMes, newMes } = require("../model/message");
const { LivingBuildingModel } = require("../model/livingbuilding");
const { LivingRoomModel } = require("../model/livingroom");

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

// major
router.get("/major/getlist", async (ctx, next) => {
  const data = await new Promise((resolve, reject) => {
    MajorModel.find({}, "-_v", (err, data) => {
      resolve(data);
    });
  });

  ctx.body = {
    state: 1,
    data,
  };
});

router.post("/major/new", async (ctx, next) => {
  const newer = new MajorModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "创建成功",
  };
});

// class
router.get("/class/getlist", async (ctx, next) => {
  const data = await new Promise((resolve, reject) => {
    ClassModel.find(ctx.query, "-_v", (err, data) => {
      resolve(data);
    });
  });

  ctx.body = {
    state: 1,
    data,
  };
});

router.get("/class/getinfo", async (ctx, next) => {
  let data = await new Promise((resolve, reject) => {
    ClassModel.findOne(ctx.query, "-_v", (err, data) => {
      resolve(data);
    });
  });

  if (data) {
    data = data.toJSON();
    const p = await new Promise((resolve, reject) => {
      PersonModel.findOne({ usernumber: data.teacher }, "-_v", (err, data) => {
        resolve(data);
      });
    });

    data.teacher = p;
  }

  ctx.body = {
    state: 1,
    data,
  };
});

router.post("/class/new", async (ctx, next) => {
  const newer = new ClassModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "创建成功",
  };
});

router.post("/class/addStudent", async (ctx, next) => {
  const { name, students } = ctx.request.body;

  const classes = await new Promise((resolve, reject) => {
    ClassModel.find({ name }, "-_v", (err, data) => {
      resolve(data);
    });
  });

  classes.students.push(...JSON.parse(students));
  classes.save();

  ctx.body = {
    state: 1,
    data: "添加成功",
  };
});

// vacation
router.post("/vacation/new", async (ctx, next) => {
  const newer = new VacationModel(ctx.request.body);
  newer.save();

  const { passPerson } = ctx.request.body;
  const res = await PersonModel.findOne({ name: passPerson }, "-_v");
  newMes({
    id: new Date().getTime() + "",
    usernumber: res.usernumber,
    type: "新待审批",
    time: new Date().getTime() + "",
    by: "系统",
    content: `您有新的请假申请待审批，请注意及时处理~`
  });

  ctx.body = {
    state: 1,
    data: "创建成功",
  };
});

router.get("/vacation/getlist", async (ctx, next) => {
  const data = await VacationModel.find(ctx.query, "-_v").sort({ _id: -1 });

  for (let i in data) {
    data[i] = data[i].toJSON();
    
    const userInfo = await PersonModel.findOne({ usernumber: data[i].usernumber });
    data[i].userInfo = userInfo;
  }

  ctx.body = {
    state: 1,
    data,
  };
});

router.post("/vacation/set", async (ctx, next) => {
  const { id, passed } = ctx.request.body;
  VacationModel.updateOne({ id }, { $set: { passed } }, (err, data) => {});

  const res = await VacationModel.findOne({ id });

  const { usernumber } = res; 
  newMes({
    id: new Date().getTime() + "",
    usernumber,
    type: "新审批结果",
    time: new Date().getTime() + "",
    by: "系统",
    content: `您有新的审批结果，请注意查收~`
  })

  ctx.body = {
    state: 1,
  };
});

// message
router.get("/message/getlist", async (ctx, next) => {
  const data = await MessageModel.find(ctx.query, "-_v", ).sort({ _id: -1 });

  ctx.body = {
    state: 1,
    data,
  };
});

router.post("/message/read", async (ctx, next) => {
  const { id } = ctx.request.body;
  readMes(id);

  ctx.body = {
    state: 1,
  };
});

// livingbuilding
router.post("/lvbuilding/new", async (ctx, next) => {
  const newer = new LivingBuildingModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "创建成功",
  };
});

router.get("/lvbuilding/getlist", async (ctx, next) => {
  const data = await LivingBuildingModel.find(ctx.query, "-_v", );

  for (let i in data) {
    data[i] = data[i].toJSON();

    const rooms = await LivingRoomModel.find({ building: data[i].name });
    for (let j in rooms) {
      rooms[j] = rooms[j].toJSON();

      const persons = await PersonModel.find({ livingroom: rooms[j].name }, "-_v");
      rooms[j].including = persons.length;
    }
    
    data[i].rooms = rooms;
  }

  ctx.body = {
    state: 1,
    data,
  };
});


// livingroom
router.post("/lvroom/new", async (ctx, next) => {
  const newer = new LivingRoomModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "创建成功",
  };
});

module.exports = router;

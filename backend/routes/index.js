const router = require("koa-router")();
const mongoose = require("mongoose");
const { MajorModel } = require("../model/major");
const { ClassModel } = require("../model/class");
const { VacationModel } = require("../model/vacation");
const { PersonModel } = require("../model/person");
const { MessageModel, readMes, newMes } = require("../model/message");
const { LivingBuildingModel } = require("../model/livingbuilding");
const { LivingRoomModel } = require("../model/livingroom");
const { CheckModel } = require("../model/check");
const { CheckingModel } = require("../model/checking");
const { CourseModel } = require("../model/course");

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
  const { name } = ctx.query;
  const where = name ? { name: { $regex: name } } : {};
  const data = await new Promise((resolve, reject) => {
    MajorModel.find(where, "-_v", (err, data) => {
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

router.post("/major/del", async (ctx, next) => {
  await MajorModel.deleteOne(ctx.request.body);

  ctx.body = {
    state: 1,
    data: "删除成功",
  };
});
router.post("/major/edit", async (ctx, next) => {
  const { id, name, summary } = ctx.request.body;
  const res = await MajorModel.updateOne({ id }, { $set: { name, summary } });
  console.log(id, name, summary, res, "??");

  ctx.body = {
    state: 1,
    data: "修改成功",
  };
});

// class
router.get("/class/getlist", async (ctx, next) => {
  const { name, major } = ctx.query;
  const where = name ? { name: { $regex: name } } : {};
  major && (where.major = major);

  const data = await new Promise((resolve, reject) => {
    ClassModel.find(where, "-_v", (err, data) => {
      resolve(data);
    });
  });

  for (let i in data) {
    data[i] = data[i].toJSON();
    const teacherInfo = await PersonModel.findOne({
      usernumber: data[i].teacher,
    });
    data[i].teacher = teacherInfo.name;
  }

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

router.post("/class/del", async (ctx, next) => {
  await ClassModel.deleteOne(ctx.request.body);

  ctx.body = {
    state: 1,
    data: "删除成功",
  };
});
router.post("/class/edit", async (ctx, next) => {
  const { _id, name, teacher, major } = ctx.request.body;
  await ClassModel.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { $set: { name, teacher, major } }
  );

  ctx.body = {
    state: 1,
    data: "修改成功",
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
    content: `您有新的请假申请待审批，请注意及时处理~`,
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

    const userInfo = await PersonModel.findOne({
      usernumber: data[i].usernumber,
    });
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
    content: `您有新的审批结果，请注意查收~`,
  });

  ctx.body = {
    state: 1,
  };
});

// message
router.get("/message/getlist", async (ctx, next) => {
  const data = await MessageModel.find(ctx.query, "-_v").sort({ _id: -1 });

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
  const data = await LivingBuildingModel.find(ctx.query, "-_v");

  for (let i in data) {
    data[i] = data[i].toJSON();

    const rooms = await LivingRoomModel.find({ building: data[i].name });
    for (let j in rooms) {
      rooms[j] = rooms[j].toJSON();

      const persons = await PersonModel.find(
        { livingroom: rooms[j].name },
        "-_v"
      );
      rooms[j].including = persons.length;
      rooms[j].students = persons;
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

router.post("/lvroom/addstudent", async (ctx, next) => {
  const { usernumber, livingroom } = ctx.request.body;
  await PersonModel.updateOne({ usernumber }, { $set: { livingroom } });

  ctx.body = {
    state: 1,
    data: "添加成功",
  };
});

// 签到
router.post("/check/new", async (ctx, next) => {
  const newer = new CheckModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "创建成功",
  };
});

router.post("/checking/new", async (ctx, next) => {
  const { code, checkId } = ctx.request.body;

  // 是否已结束
  const res = await CheckModel.findOne({ id: checkId });
  if (res.isEnd) {
    return (ctx.body = {
      state: 0,
      data: "打卡已结束",
    });
  }

  // 是否错误
  if (code !== res.code) {
    return (ctx.body = {
      state: 0,
      data: "打卡号码错误",
    });
  }

  const newer = new CheckingModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "打卡成功",
  };
});

router.get("/check/getlist", async (ctx, next) => {
  const { usernumber, course } = ctx.query;
  const data = await CheckModel.find({ course }, "-_v").sort({ _id: -1 });

  for (let i in data) {
    data[i] = data[i].toJSON();

    const res = await CheckingModel.findOne({
      checkId: data[i].id,
      usernumber,
    });
    data[i].isChecked = !!res;
  }

  ctx.body = {
    state: 1,
    data,
  };
});

router.get("/checking/ischeck", async (ctx, next) => {
  const { checkId, usernumber } = ctx.query;
  const data = await CheckingModel.findOne({ checkId, usernumber }, "-_v");

  ctx.body = {
    state: 1,
    data: !!data,
  };
});

router.get("/check/getinfo", async (ctx, next) => {
  const { courseName, checkId } = ctx.query;

  const c = await new Promise((resolve, reject) => {
    CourseModel.findOne({ name: courseName }, "-_v", (err, data) => {
      resolve(data);
    });
  });
  const students = ["18级软件工程"];

  let grade = students[0].slice(0, 2);
  let major = students[0].slice(3);
  grade = `${parseInt(grade)}`;

  const data = await new Promise((resolve, reject) => {
    PersonModel.find({ grade, major }, "-_v", (err, data) => {
      resolve(data);
    });
  });

  const result = { unchecked: [], checked: [] };

  for (let i in data) {
    data[i] = data[i].toJSON();

    const res = await CheckingModel.findOne({
      usernumber: data[i].usernumber,
      checkId,
    });
    data[i].isChecked = !!res;

    if (!!res) {
      result.checked.push(data[i]);
    } else {
      result.unchecked.push(data[i]);
    }
  }

  ctx.body = {
    state: 1,
    data: result,
  };
});

router.post("/check/close", async (ctx, next) => {
  const { id } = ctx.request.body;
  CheckModel.updateOne(
    { id },
    {
      $set: {
        isEnd: true,
        endTime: new Date(),
      },
    },
    (err, data) => {}
  );

  ctx.body = {
    state: 1,
  };
});

router.get("/check/isclose", async (ctx, next) => {
  const { id } = ctx.query;
  const data = await CheckModel.findOne({ id }, "-_v");

  ctx.body = {
    state: 1,
    data: data.isEnd,
  };
});

router.post("/post", async (ctx, next) => {
  const { path } = ctx.request.files["file"];
  const name = path.split("\\")[path.split("\\").length-1];

  ctx.body = {
    url: `http://192.168.0.37:3000/upload/${name}`
  }
});

module.exports = router;

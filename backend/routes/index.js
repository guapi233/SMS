const router = require('koa-router')()
const { MajorModel } = require("../model/major");
const { ClassModel } = require("../model/class");

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// major
router.get("/major/getlist", async (ctx, next) => {
  const data = await new Promise((resolve, reject) => {
    MajorModel.find({}, "-_v", (err, data) => {
      resolve(data);
    })
  });

  ctx.body = {
    state: 1,
    data
  };
});

router.post("/major/new", async (ctx, next) => {
  const newer = new MajorModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "创建成功"
  };
});

// class
router.get("/class/getlist", async (ctx, next) => {
  const data = await new Promise((resolve, reject) => {
    ClassModel.find({}, "-_v", (err, data) => {
      resolve(data);
    })
  });

  ctx.body = {
    state: 1,
    data
  };
});

router.post("/class/new", async (ctx, next) => {
  const newer = new ClassModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "创建成功"
  };
});

router.post("/class/addStudent", async (ctx, next) => {
  const { name, students } = ctx.request.body;

  const classes = await new Promise((resolve, reject) => {
    ClassModel.find({ name }, "-_v", (err, data) => {
      resolve(data);
    })
  });

  classes.students.push(...JSON.parse(students));
  classes.save();

  ctx.body = {
    state: 1,
    data: "添加成功"
  }
})

module.exports = router

const router = require("koa-router")();
const { CourseModel } = require("../model/course");
const { SelectCourseModel } = require("../model/selectCourse");
const { ExamModel } = require("../model/exam");
const { getUserInfo } = require("../model/person");
const { ResultModel } = require("../model/result");

router.prefix("/course");

router.get("/", function (ctx, next) {
  ctx.body = "this is a class response!";
});

router.get("/getlist", async function (ctx, next) {
  const { major, grade, usernumber } = ctx.query;
  const where = major ? { students: { $regex: `${grade}级${major}` } } : {};
  let c = null;
  if (usernumber) {
    c = await new Promise((resolve, reject) => {
      SelectCourseModel.find({ usernumber }, "", (err, data) => {
        resolve(data);
      });
    });
  }

  // 获取主修
  const data = await new Promise((resolve, reject) => {
    CourseModel.find(where, "", (err, data) => {
      console.log("???", err);
      resolve(data);
    });
  });

  // 获取选修
  if (c) {
    const w = [];
    for (let i of c) {
      w.push(i.courseId);
    }

    const d = await new Promise((resolve, reject) => {
      CourseModel.find({ name: { $in: w } }, "", (err, data) => {
        resolve(data);
      });
    });

    d[0] && data.push(...d);
  }

  // 获取老师信息
  for (let i in data) {
    data[i] = data[i].toJSON();
    data[i].teacher = await getUserInfo(data[i].teacher);
  }

  ctx.body = {
    state: 1,
    data,
  };
});

router.get("/getinfo", async function (ctx, next) {
  const data = await new Promise((resolve, reject) => {
    CourseModel.find(ctx.query, "", (err, data) => {
      resolve(data);
    });
  });

  // 获取老师信息
  for (let i in data) {
    data[i] = data[i].toJSON();
    data[i].teacher = await getUserInfo(data[i].teacher);
  }

  ctx.body = {
    state: 1,
    data,
  };
});

router.post("/new", function (ctx, next) {
  // 处理涉及学生字段
  const { students } = ctx.request.body;
  let s = "";
  for (let i in students) {
    s += `${students[i][0]}${students[i][1]}||`;
  }
  ctx.request.body.students = s;

  const newer = new CourseModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "创建成功",
  };
});

router.post("/select", function (ctx, next) {
  const newer = new SelectCourseModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "选课成功",
  };
});

router.post("/newexam", function (ctx, next) {
  // 处理涉及学生字段
  const { students } = ctx.request.body;
  let s = "";
  for (let i in students) {
    s += `${students[i][0]}${students[i][1]}||`;
  }
  ctx.request.body.students = s;

  const newer = new ExamModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "创建成功",
  };
});

router.get("/getexamlist", async function (ctx, next) {
  const { course, usernumber } = ctx.query;

  const data = await new Promise((resolve, reject) => {
    ExamModel.find({ course }, (err, data) => {
      resolve(data);
    });
  });

  // 查询下查询人的成绩
  for (let i in data) {
    data[i] = data[i].toJSON();

    const result = await new Promise((resolve, reject) => {
      ResultModel.findOne({ name: data[i].name, usernumber }, (err, data) => {
        resolve(data);
      });
    })
    data[i].result = result.result;
  }

  ctx.body = {
    state: 1,
    data,
  };
});

router.get("/getmyexam", async function (ctx, next) {
  const { major, grade } = ctx.query;
  const students = `${grade}级${major}`;

  // 1. 查询这个专业的课程
  const courses = await new Promise((resolve, reject) => {
    CourseModel.find({ students: { $regex: students } }, "-_v", (err, data) => {
      resolve(data);
    })
  });

  // 2. 查询其中包含的考试
  const data = [];
  for (let i in courses) {
    courses[i] = courses[i].toJSON();

    const exams = await new Promise((resolve, reject) => {
      ExamModel.find({ course: courses[i].name }, "-_v", (err, data) => {
        resolve(data);
      });
    })

    data.push(...exams);
  };

  ctx.body = {
    state: 1,
    data
  };
});

module.exports = router;

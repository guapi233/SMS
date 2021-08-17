const router = require("koa-router")();
const { ResultModel } = require("../model/result");
const { CourseModel } = require("../model/course");
const { PersonModel } = require("../model/person");
const { ExamModel } = require("../model/exam");

router.prefix("/result");

router.get("/", function (ctx, next) {
  ctx.body = "this is a result response!";
});

router.get("/getlist", async function (ctx, next) {
  const { name } = ctx.query;
  // 1. 查询该考试属于哪一个课程
  const examObj = await new Promise((resolve, reject) => {
    ExamModel.find({ name }, "-_v", (err, data) => {
      resolve(data[0]);
    });
  });

  // 2.查询该课程中的人群
  let courseObj = await new Promise((resolve, reject) => {
    CourseModel.find({ name: examObj.course }, "-_v", (err, data) => {
      resolve(data[0]);
    });
  });

  // 3.查询他们的信息及成绩
  let { students } = courseObj;
  students = students.split("||");
  const data = [];

  await Promise.all(
    students.map(async (student) => {
      if (!student) return;

      const grade = student.slice(0, 2);
      const major = student.slice(3);
      let persons = await new Promise((resolve, reject) => {
        PersonModel.find({ grade, major }, "-_v", (err, data) => {
          resolve(data);
        });
      });

      for (let i in persons) {
        persons[i] = persons[i].toJSON();
        const { usernumber } = persons[i];
        let result = await new Promise((resolve, reject) => {
          ResultModel.find({ name, usernumber }, "-_v", (err, data) => {
            resolve(data[0]);
          });
        });

        persons[i].result = result.result;
        persons[i].qualified = result.qualified ?"√" :"×";
        data.push(persons[i]);
      }
    })
  );

  ctx.body = {
    state: 1,
    data,
  };
});

router.get("/getmy", async function (ctx, next) {
  const { usernumber } = ctx.query;

  const data = await new Promise((resolve, reject) => {
    ResultModel.find({ usernumber }, (err, data) => {
      resolve(data);
    })
  });

  for (let i in data) {
    data[i] = data[i].toJSON();
    data[i].qualified = data[i].qualified ?"√" :"×";
  }

  ctx.body = {
    state: 1,
    data
  }
});

router.post("/new", function (ctx, next) {
  const newer = new ResultModel(ctx.request.body);
  newer.save();

  ctx.body = {
    state: 1,
    data: "创建成功",
  };
});

module.exports = router;

const router = require("koa-router")();
const { MessageModel, readMes, newMes } = require("../model/message");
const {
  getUserInfo,
  userIsExist,
  newUser,
  PersonModel,
} = require("../model/person.js");

router.prefix("/person");

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});

router.post("/newmes", function (ctx, next) {
  newMes(ctx.request.body);

  ctx.body = {
    state: 1,
    data: "发布成功"
  };
})

router.get("/getmes", async function (ctx, next) {
  const data = await new Promise((resolve, reject) => {
    MessageModel.find(ctx.query, "-_v", (err, data) => {
      resolve(data);
    })
  });

  ctx.body = {
    state: 1,
    data
  }
})

router.get("/readmes", function (ctx, next) {
  readMes(ctx.query);

  ctx.body = {
    state: 1
  };
});

router.get("/getlist", async function (ctx, next) {
  let data;

  data = await new Promise((resolve, reject) => {
    PersonModel.find(ctx.query, "-_v", (err, data) => {
      resolve(data);
    });
  });

  ctx.body = {
    state: 1,
    data,
  };
});

router.post("/login", async function (ctx, next) {
  const { usernumber, password } = ctx.request.body;

  const result = await userIsExist({ usernumber, password });

  if (result) {
    const data = await getUserInfo(usernumber);

    ctx.body = {
      state: 1,
      data,
    };
  } else {
    ctx.body = {
      state: 0,
      data: "账号或密码错误",
    };
  }
});

router.post("/new", function (ctx, next) {
  newUser(ctx.request.body);

  ctx.body = {
    state: 1,
    data: "注册成功",
  };
});

router.post("/setpassword", function (ctx, next) {
  const { usernumber, password } = ctx.request.body;

  PersonModel.updateOne({ usernumber }, { $set: { password } }, (err, data) => {
    console.log(data, err)
  });

  ctx.body = {
    state: 1,
    data: "注册成功",
  };
});

module.exports = router;

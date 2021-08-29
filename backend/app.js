const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const cors = require("koa2-cors");
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody = require("koa-body")
const static = require("koa-static")
const logger = require('koa-logger')
const path = require("path")

const index = require('./routes/index')
const person = require('./routes/person')
const course = require('./routes/course')
const result = require('./routes/result')

// error handler
onerror(app)

// middlewares
app.use(cors());
app.use(static(__dirname+'/public')); // __dirname是当前文件夹
app.use(koaBody({
  multipart:true, // 支持文件上传
  formidable:{
    uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}));
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(person.routes(), person.allowedMethods())
app.use(course.routes(), course.allowedMethods())
app.use(result.routes(), result.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

const Koa = require('koa');
const Cors = require('koa-cors');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
// koa-bodyparser 解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中
const bodyParser = require('koa-bodyparser');
// 导入配置文件
const config = require('./config/index.js');
// 导入controller middleware:
const controllers = require('./controllers/config.js');

const app = new Koa();
const corsOptions = {
  // origin: '*'
};
// 通过koa-cors 设置跨域请求
app.use(Cors(corsOptions));
// log request URL:
app.use(async (ctx, next) => {
    await next();
});

// 在合适的位置加上：由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());

// 使用middleware:
app.use(controllers(router));

// 在端口3000监听:
app.listen(config.port);
console.log(`app started at port ${config.port}`);
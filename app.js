const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
// koa-bodyparser 解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中
const bodyParser = require('koa-bodyparser');
// 导入controller middleware:
const controllers = require('./controllers/config.js');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 在合适的位置加上：由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());

// 使用middleware:
app.use(controllers(router));

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
let path = require('path');

// 通过NODE_ENV来设置环境变量，如果没有指定则默认为生产环境
// 备注：node-dev 启动 app.js 默认是 development；pm2 启动则为 undefined；所以本应用在package.json内未设置NODE_ENV；
let env = process.env.NODE_ENV || 'production';   
env = env.toLowerCase();
// 载入配置文件
let file = path.resolve(__dirname, env);
try {
  let config = module.exports = require(file);
  console.log('Load config: [%s] %s', env, file);
} catch (err) {
  console.error('Cannot load config: [%s] %s', env, file);
  throw err;
}
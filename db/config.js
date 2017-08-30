const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const promise = require("bluebird");
const db_config = require('./db.js'); // database 账户信息

mongoose.Promise = promise;  // 为mongooes 添加第三方 promise库，原有的库 会在新版本废除

let db_schemaModels = {}; // 每个数据库的 多个schemaModel（及db_collection），添加到对象中
/* usage：
db_schemaModels = {
    db_name: {
        collection_name: schemaModel,
        ...
    },
    ...
}*/

// 多数据库连接 的使用 mongoose.createConnection() 函数连接数据库

for(let key in db_config){  // 为每个 db 创建连接
    let URL = `mongodb://${db_config[key].username}:${db_config[key].password}@${db_config[key].ip}:${db_config[key].port}/${db_config[key].database}`;
    let db = mongoose.createConnection(URL, {useMongoClient: true}, (error) => {
        if (error) {
            console.log("erorr:" + error);
        } else {
            console.log(`${db_config[key]} start success............`);
        }
    });
    let files = fs.readdirSync(__dirname+`/${key}/`);   // 读取每个 db 的schemaModel 配置文件；
    let schemaModels = {};                              // db 的schemaModel集合；（每个db_collection 对应一个schemaModel）
    files.forEach(file => {                             // 一个文件对应 一个schemaModel（及db_collection）
        let name = path.basename(file, '.js');
        let schemaName = new mongoose.Schema(require(__dirname + `/${key}/${file}`));
        schemaModels[name] = db.model(name, schemaName);
    });
    db_schemaModels[key] = schemaModels;
}

module.exports = db_schemaModels;

// 多数据库连接，每个数据库的库名 对应mongdb文件夹下 一个文件夹
// usage: mongodb/db_name(qidian)/collection_name(booklist,books).js
// usage: mongodb/db_name(test)/collection_name(userInfo).js

/* 每个数据库的 在其对应的数据库下 创建账户；
usage: use db_name, db.createuser({
    user: "xxx",
    pwd: "xxx",
    roles: [
        {
            role: "readWrite", // 有很多权限可选择设置
            db: "xxx"
        }
    ]
})*/
const db_config = {
    qidian: {       // database_name
        ip: '120.77.81.108',
        port: '27017',
        database: 'qidian',
        username: 'Test',
        password: '101010',
    },
    test: {         // database_name
        ip: '120.77.81.108',
        port: '27017',
        database: 'test',
        username: 'Test',
        password: '101010',

    }
}

module.exports = db_config;

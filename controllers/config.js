const fs = require('fs');
const glob = require('glob');

// 遍历 controllers文件夹内的文件 
function addControllers(router, dirName) {
    let files = glob.sync(__dirname + `/${dirName}/**/*.js`);
    let js_files = files.filter((f) => f.endsWith('.js') );

    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(f);
        addMapping(router, mapping);
    }
}

// 为每个请求 注册 路由 router
function addMapping(router, mapping) {
    for (let url in mapping) {
        let path = '';
        let method = url.slice(0, url.indexOf('/'));
        switch(method){
            case 'GET': 
                path = url.substring(3);
                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
                break;
            case 'POST': 
                path = url.substring(4);
                router.post(path, mapping[url]);
                console.log(`register URL mapping: POST ${path}`);
                break;
            case 'DELETE': 
                path = url.substring(6);
                router.delete(path, mapping[url]);
                console.log(`register URL mapping: DELETE ${path}`);
                break;
            default:
                console.error(url + "请求方式(method)不对！！！")
        }
    }
}

// addControllers(router);
module.exports = function (router) {
    let controllers_modes_dir = 'modes'; // api 模块的文件目录
    addControllers(router,  controllers_modes_dir);
    return router.routes();
};
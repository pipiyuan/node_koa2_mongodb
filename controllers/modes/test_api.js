const UserInfo = require('../../db/config.js').test.userInfo;
const nunjucks = require('../../views/nunjucks_config.js');

// userInfo.create({
//     name: '小明',
// }, (err, userInfo) => {
//     if (!err) {
//         console.log('save ok!!!')
//     }
// });

var fn_index = async (ctx, next) => {
    ctx.response.body = nunjucks.render('index.html');;
};

var fn_hello = async(ctx, next) => {
    // var data = await queryData();
    var params_name = ctx.params.name;
    let data = await UserInfo.find({age: 0});
    ctx.response.body = nunjucks.render('hello.html', {data:data});

};

var fn_signin = async (ctx, next) => {
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
                            <p><a href="/">Try again</a></p>`;
    }
};


module.exports = {
    'GET/': fn_index,
    'GET/hello/:age': fn_hello,
    'POST/signin': fn_signin
};
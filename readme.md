# Node.js+koa2+mongoose的后台serverce项目结构
> 本项目是学习node、nongdodb、koa后搭建一个后台服务的项目结构，方便以后简单项目的快速开发和复用；  

> 在线api地址：[API](http://120.77.81.108:3000/booklist?size=6&type=slide&lastId=0)
## 安装
```
git clone https://github.com/pipiyuan/node_koa2_mongodb.git
```
## 运行
```
$ cd node_koa2_mongodb
$ npm run dev           // 测试开发
$ npm start             // 生成环境
```
## 项目结构
```
├── app.js 					// 入口文件  
├── aviews  
│   ├── nunjucks_config.js 	// nunjuck模板引擎配置文件  
│   └── pages				// html模板页面文件夹
│       ├── hello.html  
│       └── index.html  
├── config 					// 运行环境配置			
│   ├── development.js
│   ├── index.js
│   └── production.js
├── controllers 			// 关于 api 接口文件夹
│   ├── config.js 			// api 接口配置文件
│   └── modes 				// 模块的 api 接口
│       ├── qidian_api.js 	  
│       └── test_api.js 	  
├── db 						// 关于 db 文件夹
│   ├── config.js 			// mongoose 的配置文件
│   ├── db.js 				// db 配置文件 
│   ├── qidian 				// 模块（数据库db）的 schema 配置文件
│   │   ├── booklist.js
│   │   └── books.js
│   └── test
│       └── userInfo.js
├── package-lock.json
├── package.json
├── pm2_config.json 		// pm2的配置文件
└── readme.md  
```

## 接口说明

#### 书籍列表
说明：获取书籍list  
接口地址：/booklist?size=6&type=slide&lastId=0  
参数：  
* size：获取list的长度，默认为5  
* type：获取书籍的类型，默认为slide，共两种slide和desc  
* lastId：返回数据list中退后一条数据的id，默认为0 

#### 书籍详情
说明：获取书籍内容 
接口地址：/book/6  
参数：  
* id：书籍id  

#### 书籍章节列表
说明：获取书籍所有章节  
接口地址：/book/chapter/6  
参数：  
* id：书籍id 
* 

#### 书籍章节内容
说明：获取书籍某一章节内容  
接口地址：/book/6/6  
参数：  
* id：书籍id
* chapter：书籍章节数
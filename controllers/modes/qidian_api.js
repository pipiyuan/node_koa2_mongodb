const Booklist = require('../../db/config.js').qidian.booklist;
const Books = require('../../db/config.js').qidian.books;

let booklist = async (ctx, next) => {
    let query = ctx.query;
    let size = query.size*1 || 5;
    let type = query.type || 'slide';
    let lastId = query.lastId*1 || 0;
    let data = {};

    data.booklist = await Booklist.find({id: {$gt: lastId}}).sort({KEY:1}).limit(size);
    data.lastId = data.booklist[data.booklist.length-1].id;
    ctx.response.body = data;
};

let books = async (ctx, next) => {
    let params = ctx.params;
    let data = null;
    data = await Booklist.findOne({id: params.id*1});
    ctx.response.body = data;
};

let chapters = async (ctx, next) => {
    let params = ctx.params;
    let data = null;
    data = await Books.findOne({id: params.id*1}, {"chapters.title":1,"chapters.chapterId":1});
    data.chapters.sort((a, b) => {
    	return a.chapterId-b.chapterId
    })
    ctx.response.body = data.chapters;
};

let bookChapter = async (ctx, next) => {
    let params = ctx.params;
    let data = null;
    data = await Books.findOne({id: params.id*1, "chapters.chapterId": params.chapter*1}, {"chapters.$":1});
    ctx.response.body = data.chapters[0];
};

module.exports = {
    'GET/qidian/booklist': booklist,
    'GET/qidian/book/:id': books,
    'GET/qidian/book/chapter/:id': chapters,
    'GET/qidian/book/:id/:chapter': bookChapter,
};

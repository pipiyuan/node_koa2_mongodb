const Booklist = require('../../mongodb/config.js').qidian.booklist;
const Books = require('../../mongodb/config.js').qidian.books;

let booklist = async (ctx, next) => {
    let query = ctx.query;
    let size = query.size*1;
    let type = query.type;
    let lastId = query.lastId*1;
    let data = {};

    data.booklist = await Booklist.find({id: {$gt: lastId}}).sort({KEY:1}).limit(size);
    data.lastId = lastId;
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
    'GET/booklist': booklist,
    'GET/book/:id': books,
    'GET/book/chapter/:id': chapters,
    'GET/book/:id/:chapter': bookChapter,
};

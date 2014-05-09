var application_root = __dirname;
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

// サーバ作成
var app = express();

// サーバ設定
app.configure(function(){

    // リクエスト本文を解析して、request.bodyにセット
    app.use(express.bodyParser());

    // リクエストのオーバライドのために、request.bodyのチェック
    app.use(express.methodOverride());

    // URLとリクエスト形式の組に基づいてルートを取得
    app.use(app.router);

    // 静的コンテンツが置かれた場所を示す
    app.use(express.static(path.join(application_root, 'site')));

    // 開発中にすべてのエラーを表示
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

var port = 4711;
app.listen(port, function() {
    console.log('Expressサーバがポート %d で起動しました。モード： %s', port, app.settings.env);
});

app.get('/api', function(req, res) {
    res.send('ライブラリのAPIを利用可能です。');
});

app.get('/api/books', function(req, res) {
    return BookModel.find(function(err, books) {
        if (!err) {
            return res.send(books);
        } else {
            return console.log(err);
        }
    });
});

app.get('/api/books/:id', function(req, res) {
    return BookModel.findById(req.params.id, function(err, book) {
        if (!err) {
            return res.send(book);
        } else {
            return console.log(err);
        }
    });
});

app.post('/api/books', function(req, res) {
    var book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        keywords: req.body.keywords
    });
    book.save(function(err){
        if (!err) {
            return console.log('追加されました');
        } else {
            return console.log(err);
        }
    });
    return res.send(book);
});

app.put('/api/books/:id', function(req, res) {
    console.log('更新します：' + req.body.title);
    return BookModel.findById(req.params.id, function(err, book) {
        
        book.title = req.body.title;
        book.author = req.body.author;
        book.releaseDate = req.body.releaseDate;
        keywords: req.body.keywords;

        return book.save(function(err){
           if (!err) {
                return console.log('更新されました');
            } else {
                return console.log(err);
            }
           return res.send(book);
        });
    });
});

app.delete('/api/books/:id', function(req, res) {
    console.log('削除する本のID：' + req.params.id);
    return BookModel.findById(req.params.id, function(err, book) {
        return book.remove(function(err) {
            if (!err) {
                console.log('本が削除されました。');
                return res.send('');
            } else {
                console.log(err);
            }

        });
    });
});

// mongodbに接続
mongoose.connect('mongodb://localhost/library_database');

// スキーマ
var Keywords = new mongoose.Schema({
    keyword: String
});

var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [Keywords]
});

// モデル
var BookModel = mongoose.model('Book', Book);


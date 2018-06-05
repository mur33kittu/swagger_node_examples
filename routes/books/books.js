var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = "mongodb://localhost:27017/meanstack";
var router = express.Router();
var Book = require('./bookModel');


mongoose.connect(db).then(res => {
    console.log("Connected to mongdb");
}).catch(ex => {
    console.log("Error connecting to mongoDb ..Exiting..." + ex);
    return ex;
});


var getAllBooks = function (req, res, next) {
    Book.find(function (err, books) {
        if (err) {
            next(err);
        } else {
            res.json(books);
        }
    });
};

var createBook = function (req, res) {
    var tmpBook = new Book(req.body);

    tmpBook.save().then(item => {
        res.send("Successfull saved into database");
    }).catch(err => {
        res.status(400).send("unable to send to database");
    });
};

var updateBook = function (req, res) {
    console.log("here");
    var book = new Book(req.body);
    console.log(book);
    Book.findByIdAndUpdate(req.body._id, book, {
        new: true
    }, function (err, book) {
        if (err) {
            next(err);
        } else {
            res.send(book);
        }
    });
};

var deleteBook = function (req, res, next) {
    req.book.remove(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(req.book);
        }
    });
};


var getOneBook = function (req, res) {
    res.json(req.book);
};

var getByBookTitle = function (req, res, next, title) {
    Book.findOne({
        title: title
    }, function (err, book) {
        if (err) {
            next(err);
        } else {
            req.book = book;
            next();
        }
    });
};


router.route('/books')
    .post(createBook)
    .get(getAllBooks)
    .put(updateBook)
    .delete(deleteBook);

router.route('/books/:title')
    .get(getOneBook);

router.param('title', getByBookTitle);

module.exports = router;
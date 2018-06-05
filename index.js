var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var argv = require('minimist')(process.argv.slice(2));
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./public/swagger.json');
var PORT = 3000;
var index = require('./routes/index');
var books = require('./routes/books/books');

var app = express();

var swagger = require("swagger-node-express").createNew(app);

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname, 'client')));


app.use(logger('dev'));

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", index);
app.use("/api", books);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    console.log("Server listening on port...");
});

module.exports = app;
swagger.configure("http://localhost:3000/", '1.0.0');
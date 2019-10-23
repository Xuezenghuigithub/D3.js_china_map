var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

var chinaRouter = require('./routes/china');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', chinaRouter);

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/d3', {
  useNewUrlParser: true
})
mongoose.connection.on('connected', function () {
  console.log('连接成功');
})
mongoose.connection.on('error', function () {
  console.log('出错了');
})
mongoose.connection.on('disconnected', function () {
  console.log('连接断开');
})

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
});




module.exports = app;
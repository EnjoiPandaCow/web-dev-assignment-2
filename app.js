var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var jobs = require("./routes/job");
var news = require("./routes/news");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//Job Routes
app.get('/jobs', jobs.findAll);
app.get('/jobs/:id', jobs.findOne);
app.post('/jobs', jobs.addJob);
app.put('/jobs/:id', jobs.updateJob);
app.delete('/jobs/:id', jobs.deleteJob);
app.post('/jobs/search', jobs.search);

//User Routes
app.get('/users', users.findAll);
app.get('/users/:id', users.findOne);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);
app.post('/users/search', users.search);

app.get('/news', news.findAll);
app.get('/news/:id', news.findOne);
app.post('/news', news.addNews);
app.put('/news/:id', news.updateNews);
app.delete('/news/:id', news.deleteNews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

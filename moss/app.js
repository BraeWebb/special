const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

/* Authentication through UQ SSO */
const auth = require('./util/auth');

/* Application */
const app = express();

/* Socket connections */
const io = app.io = require('socket.io')();
app.attachServer = function(server) {
  app.io.attach(server);
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Authentication middleware */
app.use(auth.express);
app.io.use(auth.io);

/* Socket.io binding */
const bind = require('./handlers/generation');
bind(app.io);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

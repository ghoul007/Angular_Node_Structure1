var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var angular = require('./routes/angular');
// var session = require('./routes/session');
var session = require('express-session');
// var MyExpressSessionStore = require('my-express-session-store')(storeConfig);
var auth = require('./middleware/auth');
var jwt = require('jwt-express');

var logger = require('morgan');
require('dotenv').config({path: './server'});





var helmet = require('helmet');


var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("process.env.cookieSecret"));
app.use(jwt.init("process.env.jwtSecret", {
    cookieOptions: {httpOnly: false}
}));
// app.use(session);
app.use(session({
  secret: "process.env.cookieSecret",
  resave: false,
  saveUninitialized: true,
  name: 'project-session',
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'localhost',
    expires: new Date(Date.now() + 60 * 60 * 1000)
  },
  // store: MyExpressSessionStore
}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(logger('short'));
app.use(auth.logger(logger));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/',  angular);
app.use('/login',  angular);
app.use('/api',  auth.logger(logger), api);
// app.use('/',auth.setRole('user'), angular);




// app.use('/users', auth.setRole('admin'));

// app.use('/api', api);
// auth.requireRole('user')



// app.use('/api', proxy({target:'http://', changeOrigin:true}));
app.use(function(req, res) {
  var error = new Error('Not Found');
  res.status(404).json({
    status: 404,
    message: error.message,
    name: error.name
  });
});
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

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

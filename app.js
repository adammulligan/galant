/**
 * Module dependencies.
 */

var express = require('express');
var flash = require('express-flash');
var path = require('path');
var expressValidator = require('express-validator');

/**
 * Load controllers.
 */

var homeController = require('./controllers/home');
var bookController = require('./controllers/book');
var searchController = require('./controllers/search');

/**
 * API keys + Passport configuration.
 */

var secrets = require('./config/secrets');

/**
 * Create Express server.
 */

var app = express();

/**
 * Express configuration.
 */

var hour = 3600000;
var day = (hour * 24);
var week = (day * 7);
var month = (day * 30);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('connect-assets')({
  src: 'public',
  helperContext: app.locals
}));
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.session({
  secret: secrets.sessionSecret
}));
app.use(express.csrf());
app.use(function(req, res, next) {
  res.locals.token = req.csrfToken();
  res.locals.secrets = secrets;
  next();
});
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});
app.use(express.errorHandler());

/**
 * Application routes.
 */

app.get('/', homeController.index);

app.get('/book/new', bookController.new);
app.post('/book', bookController.create);
app.get('/book/:id', bookController.show);

app.get('/search', searchController.index);

/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log("✔ Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});

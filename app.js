var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	request = require('request'),
	cheerio = require('cheerio');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;

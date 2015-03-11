var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
// Install Redis: sudo npm install redis
// Require redis
var redis = require('redis').createClient();

// Require z-i18n
var i18n = require('z-i18n');

var languages = [
    'en_GB',
    'nl_NL',
    'vi_VN'
];

// Set current
i18n.init({current_lang: 'en_GB', default_lang : 'en_GB'});

// Or set current_lang/default_lang
// i18n.init({current_lang : 'en_GB', default_lang : 'en_GB'});

// Translations into the dutch language.
// i18n.init({current_lang : 'nl_NL', default_lang : 'en_GB'});

var languageRedisCache = 'LANGUAGE_CACHE_REDIS';

redis.get(languageRedisCache, function (error, result) {
    if (result == null) {
        i18n.add('languages/nl_NL/moduleA.nl_NL.json', 'nl_NL');
        i18n.add('languages/en_GB/moduleA.en_GB.json', 'en_GB');
        global.i18n = i18n;
        global._t = i18n.__;
        //global._ = i18n.__;

        redis.set(languageRedisCache, JSON.stringify(i18n.getTranslation()), redis.print);
    } else {
        i18n.setTranslation(result);
        global.i18n = i18n;
        global._t = i18n.__;
        //global._ = i18n.__;
    }
});

//Use middleware to set current language
app.use(function (req, res, next) {
    if (req.query.lang != undefined && languages.indexOf(req.query.lang) >= 0) {
        i18n.setCurrentLang(req.query.lang);
    }else{
        i18n.setCurrentLang(i18n.getDefaultLang());
    }
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());

app.set('view engine', 'ejs');

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Server running on port: ' + port);
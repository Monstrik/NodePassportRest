var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


var morgan = require('morgan');
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

app.use(morgan('dev'));

var passport = require('passport');
require('./config/passport')(passport);
app.use(passport.initialize());




app.set('view engine', 'ejs');

require('./app/routes.js')(app, passport);
app.listen(port);
console.log('Server running on port: ' + port);
'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var process_forms = require('./app/models/process.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var path = require('path');
//var process = require('./app/models/process.js');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/views', express.static(process.cwd() + '/views'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport, mongoose);
process_forms(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

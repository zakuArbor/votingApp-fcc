'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			//res.redirect('/login');
			res.render('index', {loggedIn: false});
		}
	}

	function isLoggedInBoolean(req, res) {
		if (req.isAuthenticated()) {
			return true;
		}
		return false;
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			//res.sendFile(path + '/public/index.html');
			res.render('index', {loggedIn: true});
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/');
			//res.sendFile(path + '/public/index.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/create-poll')
		.get(function (req, res) {
			if (isLoggedInBoolean(req, res)) {
				res.render('create');
			}
			else {
				console.log('not logged');
				res.render('create');
				//res.render('login');
			}
		});
	
	app.route('/insert-poll') 
		.get(function (req, res) {
			if (!isLoggedInBoolean(req, res)) {
				res.render('login');
			}	
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
			//failureRedirect: '/'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};

'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport, url) {

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
	var pollHandler = new PollHandler();

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

	app.route('/vote-poll/:id')
		.post(function (req, res) {
			var logged = false;
			if (isLoggedInBoolean(req, res)) {
				logged = true;
			}
			pollHandler.addVote(req, res, logged, url);
		});

	app.route('/polls')
		.get(function (req, res) {
			pollHandler.getPolls(req, res);
		});

	app.route('/:id') 
		.get(function(req, res) {
			var err_msg = "";
			console.log("111111111111111111");
			for (var key in req.query) {
				console.log(req.query[key]);
				if (req.query[key] == 1) {
					err_msg = "Please input a valid input";	
				}
				else if (req.query[key] == 2) {
					err_msg = "You already voted. You can only vote once";
				}
			}
			
			console.log(err_msg);
			res.render('poll', {loggedIn: true, poll: req.params.id, err_msg: err_msg});
		});
	/*
	app.route('/poll/:id') 
		.get(function (req, res) {
			console.log("pika");
			res.json(req.params.id);
		});
	*/
	app.route('/poll/:id')
		.get(function (req, res) {
			var logged = false;
			if (isLoggedInBoolean(req, res)) {
				logged = true;
			}
			console.log(req.params);
			pollHandler.getPoll(req, res, logged);
		});
	
	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) { 
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

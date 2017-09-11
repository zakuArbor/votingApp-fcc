'use strict';

var Users = require('../models/users.js');
var bodyParser = require('body-parser');

module.exports = function (app) {
	app.use( bodyParser.json() );
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	})); 

	app.post('/insert-poll', function(req, res) {
		if (req.body.poll_name) {
			var poll_name = req.body.poll_name;
			var poll_options = [];
			var i;
			console.log("pika test");
			console.log(req.body.opt.length);
			if (req.body.opt.length) {
				for (i = 0; i < req.body.opt.length; i++) {
					poll_options[i] = {option: req.body.opt[i], vote: 0}
				}
				console.log(req.user.github.id);
				/*Users.findOne({ 'github.id': req.user.github.id }, { '_id': false })
					.exec(function (err, user) {
						if (err) { throw err; }
						if (!user) {
							res.sendStatus(404).send('user was not found').end();
						}
						else if (user) { 
						user.polls.push({ 
							poll_name: poll_name,
							options: poll_options
						});	
						user.save(function (err) {
							if (err) { throw err;}
							console.log('Success!');
						});
						}	
						res.send(user);
					}
				);
				*/
				Users.update({ 'github.id': req.user.github.id}, { $push :
					{
						'polls' : {
							poll_name: poll_name,
							options: poll_options
						}
					}
				}, {upsert: true}, function(err, docs) {
					res.redirect('/');
				});
			}
		}
	});
};

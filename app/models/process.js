'use strict';

var Users = require('../models/users.js');
var Poll = require('../models/polls.js');
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
			console.log(req.body.opt.length);
			if (req.body.opt.length) {
				for (i = 0; i < req.body.opt.length; i++) {
					poll_options[i] = {option: req.body.opt[i], votes: 0}
				}
				console.log(poll_options);
				
				var newPoll = new Poll();
				newPoll.owner = req.user.github.id;
				newPoll.poll_name = poll_name;
				newPoll.options = poll_options;
				newPoll.save(function (err, poll) {
					if (err) throw err;
					console.log("new poll");
					console.log(poll);
					console.log("end poll");
					Users.update(
						{'github.id': req.user.github.id},
						{
							$push:
							{
								'polls': {
									poll_id: poll._id
								}
							}
						}, 
						function (err) {
							if (err) throw err;
							console.log("added");
						}
					);
				});
					//return done(null, newPoll);
				//});
/*
				Users.update( 
					{ 'github.id': req.user.github.id}, 
					{  
						$push :
						{
							'polls' : {
								poll_name: poll_name,
								options: poll_options
							}
						}
					}
				});*/
				res.redirect('/');
			}
		}
	});
};

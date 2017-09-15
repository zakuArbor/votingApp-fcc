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
			console.log(req.body.opt.length);
			if (req.body.opt.length) {
				for (i = 0; i < req.body.opt.length; i++) {
					poll_options[i] = {option: req.body.opt[i], votes: 0}
				}
				console.log(poll_options);
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
					}, 
					{upsert: true}, function(err, docs) {
					res.redirect('/');
				});
			}
		}
	});
};

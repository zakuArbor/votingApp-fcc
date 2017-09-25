'use strict';
var Polls = require('../models/polls.js');
var Users = require('../models/users.js');
var ObjectId = require('mongodb').ObjectID;

function UserHandler () {

	this.getUser = function (req, res, logged) {
		if (logged) {
			console.log("fetch user");
			Users
				.find({'github.id': req.user.github.id}, {polls: 1, github: 1}, function (err, results) {
					if (err) {throw err; }
					console.log("pika");
					if (results) {
						var json = {displayName: results[0].github.displayName};
						console.log(results);
						res.json(json);
					}
				});
		}
	};
	this.getUserPolls = function (req, res, logged) {
		if (logged) {
			Polls
				.find({'owner': req.user.github.id}, {options: 0, owner: 0},function (err, results) {
					if (err) throw err;
					console.log(results);
					res.json(results);
				});
		}
	}
}

module.exports = UserHandler;

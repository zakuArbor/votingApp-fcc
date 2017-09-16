'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');
var ObjectId = require('mongodb').ObjectID;

function PollHandler () {

	this.getPolls = function (req, res) {
		console.log("fetch all polls");
		//Users
		Polls
			.find({}, function (err, results) {
				if (err) {throw err; }
				if (results) {
					res.json(results);
				}
			});
	};

	this.getPoll = function (req, res, logged) {
		console.log(req.params.id);
		Polls
			.findOne(
				{"_id": req.params.id }, 
				function(err, result) {
					if (err) { throw err; }
					if (result) {console.log(result);
						var json = {
		                            		"poll_name": result.poll_name,
                            				"options": result.options,
							"ownership": false
                        			}
						console.log(json.options);
						if (logged) {
							Users.count({ 'github.id': req.user.github.id }, function (err, count) {
								json.ownership = true;
								console.log("test");
								res.json(json);
							});
						}
						else {
							res.json(json);
						}
					}
				}
			);
	};

	//this.updateVote = function (req, res, 

	this.addVote = function (req, res, logged, url) {
		var path = "/" + req.body.poll_id;
		Polls
			.update(
				{"_id": req.body.poll_id, "options.option": req.body.option},
				{$inc: { "options.$.votes": 1}}, 
				function (err, doc) {
					if (err) throw err;
					if (logged) {
						Users.update(
						{'github.id': req.user.github.id}, 
						{
							$push:
							{
								"voted": req.body.poll_id
							}
						}, function (err) {
							if (err) throw err;
						});
					}
				}
			);
		res.redirect(path);
	
	};

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}

module.exports = PollHandler;

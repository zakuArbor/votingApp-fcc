'use strict';

var Users = require('../models/users.js');
var ObjectId = require('mongodb').ObjectID;

function PollHandler () {

	this.getPolls = function (req, res) {
		Users
			.find({}, {'_id': 0, 'polls._id': 1, 'polls.poll_name': 1}, function (err, results) {
				if (err) {throw err; }
				if (results) {
					res.json(results);
				}
			});
	};

	this.getPoll = function (req, res, logged) {
		console.log(req.params.id);
		Users
			.findOne(
				{"polls._id": req.params.id }, 
				{ polls: { $elemMatch: { "_id": req.params.id } } },
				function(err, result) {
					if (err) { throw err; }
					if (result) {console.log(result);
						var json = {
		                            		"poll_name": result.polls[0].poll_name,
                            				"options": result.polls[0].options,
							"ownership": false
                        			}

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
		//check if user already voted
		console.log("**************");
		console.log(req.body.option);
		if (req.body.option = "") {
			console.log("redir");
			res.redirect(url.format({
				pathname: path, 
				query: {
					error: 1
				}
			}));
		}
		else {
			if (logged) {
				console.log("pika pika pika");
				console.log(req.user.github.id);
				Users
					.count(
						{"github.id": req.user.github.id, "vote": req.body.poll_id}, function (err, count) {
							if (err) throw err;
							if (count > 0) {
								res.redirect(path);
							}
							else {
								alert("Else");
							}
						}
					);
					console.log("pika pika pika pikachu says hello");
			}
			console.log("print");
			console.log(req.body);
			Users
				.update(
					{"polls.poll_id": req.body.poll_id},
					{$inc: { "polls.$.vote": 1}}
				);
		
			console.log("test hello");
			
			res.redirect('/' + req.body.poll_id);
		}
			/*Users
				.count(
					{"polls.poll_id": req.body.poll_id},
					{
						$push:
						{ "votes": req.body.poll_id }
					}, 
					{upsert: true}, function(err, docs) {
						res.redirect('/' + req.body.poll_id);
					}
				);		*/
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

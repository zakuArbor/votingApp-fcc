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
							"ownership": false,
							"voted": false
                        			}
						console.log(json.options);
						if (logged) {
							var voted = false;
							Users.count({ 'github.id': req.user.github.id }, function (err, count) {
								json.ownership = true;
								console.log("test");
								Users.count({ 'github.id': req.user.github.id, voted: req.params.id},
		                                                        function (err, count) {
                	                                                if (err) throw err;
									console.log("***");
                        	                               		if (count > 0) {
										console.log("pika voted");
								                json.voted = true;
									}
									res.json(json);
                                                       		});
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
		var query, update;
		if (req.body.option == "new" && req.body.custom_option !== "") {
			if (!logged) {
				res.redirect(path);
			}
			query = {"_id": req.body.poll_id};
			update = {$push: {"options": {option: req.body.custom_option, votes: 1}}};
		}
		else {
			query = {"_id": req.body.poll_id, "options.option": req.body.option};
			update = {$inc: { "options.$.votes": 1}};
		}
		
		Polls
			.update(
				query,
				update, 
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
	
	this.deletePoll = function (req, res) {
		console.log("**start delete poll");
		console.log(req.user.github.id);
		console.log(req.params.id);
		Users
			.findOne( { 'github.id': req.user.github.id /*req.params.id*/ },
				function(err, result) {
					if (err) throw err; 
					if (result) {
						var userId = result._id;
						var poll_ownership = false;
						var polls = [];
						var voted = [];
						for (var i = 0; i < result.polls.length; i++) {
							if (result.polls[i].poll_id == req.params.id) {
								poll_ownership = true;
							} else {
								polls.push(result.polls[i]);
							}
						}
						for (var i = 0; i < result.voted.length; i++) {
							if (result.voted[i] !== req.params.id) {
								voted.push(result.voted[i]);
							}
						}
						
						if (poll_ownership) {
							console.log("true");
								
								Polls.findOneAndRemove({ "_id": req.params.id}, function (err, poll_result) {
									if (err) throw err;
									if (poll_result) {
									console.log("pika delete poll stage 2");
									console.log(polls);
									console.log(voted);
									Users.findById( 
				                                                {_id: userId},
										function(err, doc) {
											doc.polls = polls;
											doc.markModified("polls");
											doc.save();
											doc.voted = voted;
											doc.markModified("voted");
											doc.save(function(err) {
      											  return res.json({event:"Updated Contact"})
    											});
										}
									);
									}
								});
						}
					}
				}
			);			
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

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	owner: Number,
	poll_name: String,
	options: [
			{
				option: String,
				votes: Number
			}
		]	
	
});

module.exports = mongoose.model('Polls', Poll);

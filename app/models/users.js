'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      		publicRepos: Number
	},
	polls: [
		{
			//poll_name: String,
			/*options: [
				{
					option: String,
					votes: Number
				}
			]*/
			poll_id: String	
		}
		],
	voted: []
});

module.exports = mongoose.model('User', User);

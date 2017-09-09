'use strict';

var bodyParser = require('body-parser');

module.exports = function (app) {
	app.use( bodyParser.json() );
	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		extended: true
	})); 

	app.post('/insert-poll', function(req, res) {
		if (req.body.poll_name) {
			var poll_name = { name: req.body.poll_name };
			var poll_options = [];
			var i;
			console.log("pika test");
			console.log(req.body.opt.length);
			if (req.body.opt.length) {
			for (i = 0; i < req.body.opt.length; i++) {
				poll_options[i] = {option: req.body.opt[i]}
			}
			console.log(poll_options);
			res.send(poll_options);
			}
		}
	});
};

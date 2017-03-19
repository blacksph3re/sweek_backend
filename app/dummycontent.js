var User = require('./models/user.js');
var Intern = require('./models/intern.js');
var bcrypt   = require('bcrypt-nodejs');


module.exports = function() {
	Intern.findOne({}).exec((err, res) => {
		if(err || res)
			return;

		console.log("Loading dummy data");

		var data = require('../data.json');	
		
		data.forEach((item) => {
			var intern = new Intern({
				data: {
					city: item.city,
					name: item.name,
					title: item.title,
					salary: item.salary,
					date: item.date,
					duration: item.duration
				},
				details: {
					description: item.description
				}
			});
			intern.save(function(err) {
				if(err) {
					console.log('Could not save intern', err);
				}
			});
		});
	});

	User.findOne({}).exec((err, res) => {
		if(err || res)
			return;

		console.log("Creating dummy user");

		var newUser = new User({
            email: "westerbeck.nico@gmail.com",
            password: bcrypt.hashSync("1234", bcrypt.genSaltSync(8), null),
        });

		// save the user
        newUser.save(function(err) {
        });
	});
};
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
				if(err)
					console.log('Could not save dummy intern', err);
			});
		});
	});

	User.findOne({}).exec((err, res) => {
		if(err || res)
			return;

		console.log("Creating dummy user");

		var newUser = new User({
            email: "admin@admin.com",
            password: bcrypt.hashSync("1234", bcrypt.genSaltSync(8), null),
            isAdmin: true,
            recommendations: [{
            	rating: 4.5,
            	comment: "Great, he did the internal IT for our company."
            }, {
            	rating: 4.0,
            	comment: "Responsible and experienced IT professional"
            }
            ]
        });

		// save the user
        newUser.save(function(err) {
        	if(err)
        		console.log("Could not save dummy user", err);
        });


        var newUser2 = new User({
            email: "intern@admin.com",
            password: bcrypt.hashSync("1234", bcrypt.genSaltSync(8), null),
            isAdmin: false,
            recommendations: [{
            	rating: 2.0,
            	comment: "Was not working propoperly, he is a lazy guy"
            }, {
            	rating: 1.0,
            	comment: "Did not show up anymore after a week"
            }
            ]
        });

		// save the user
        newUser.save(function(err) {
        	if(err)
        		console.log("Could not save dummy user", err);
        });
	});
};
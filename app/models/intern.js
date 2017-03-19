var mongoose = require('mongoose');
var application = require('./application.js');

var internSchema = new mongoose.Schema({

    data: {
    	city: String,
    	name: String,
    	title: String,
    	salary: String,
    	date: String,
    	duration: String
    },
    details : {
    	description: String,
    	places: Number
    },
    applications: [application]
});


module.exports = mongoose.model('Intern', internSchema);

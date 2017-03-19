var mongoose = require('mongoose');
var application = require('./application.js');

var internSchema = new mongoose.Schema({
    url: {
        type: String, 
        unique: true,
        default: function() {
            return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
        }
    },
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

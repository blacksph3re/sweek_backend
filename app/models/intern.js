var mongoose = require('mongoose');

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
});


module.exports = mongoose.model('Intern', internSchema);

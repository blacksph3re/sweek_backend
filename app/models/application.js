var mongoose = require('mongoose');

var applicationSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	motivation: String
});


module.exports = applicationSchema;
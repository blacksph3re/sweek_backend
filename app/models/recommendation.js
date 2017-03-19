var mongoose = require('mongoose');

var recommendationSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	rating: Number,
	comment: String
});


module.exports = recommendationSchema;
var mongoose = require('mongoose');

var configDB = require('./config/database.js');
var Intern = require('./app/models/intern.js');

mongoose.connect(configDB.url);

Intern.find({}, (err, res) => {
	console.log(res);
});
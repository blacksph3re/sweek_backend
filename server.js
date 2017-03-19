// server.js

// set up ======================================================================
// get all the tools we need
var restify  = require('restify');
var logger   = require('restify-logger');
var cookieParser = require('restify-cookies');
session = require('./config/session.js');
var app      = restify.createServer();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var dummycontent = require('./app/dummycontent.js');


var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url);
mongoose.connection.once('open', function () {
	console.log('Connected to mongodb');
});

// set up our restify application
app.use(logger('dev')); // log every request to the console
app.use(cookieParser.parse); // read cookies (needed for auth)
app.use(restify.bodyParser()); // get information from html forms

/* Copy session cookie
app.use(function(req, res, next) {
	if(req.cookies.sid)
		req.session.sid = req.cookies.sid;
	next();
});*/
app.use(session.sessionManager); // session secret




// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);



dummycontent();
var restify = require('restify');
session = require('../config/session.js');
var User = require('./models/user.js');

exports.login = function(req, res, next) {
	User.findOne({ 'email' :  req.body.email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
        	return next(err);

        // if no user is found, return the message
        if (!user)
            return next(new Error('User not found')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(req.body.password))
            return next(new Error('Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        session.save(req.session.sid, user, function(err, status){
        	// all is well, return successful user
        	res.setCookie('sid', req.session.sid);
	        res.json({
	        	success: true,
	        	data: user
	        });
		});
    });
};

exports.signup = function(req, res, next) {
	User.findOne({ 'email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
            return next(err);

        // check to see if theres already a user with that email
        if (user) {
            return next(new Error('That email is already taken.'));
        } else {

			// if there is no user with that email
            // create the user
            var newUser = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
            });

			// save the user
            newUser.save(function(err) {
                if (err)
                    throw err;
                res.json({
                	success: true,
                	data: newUser
                });
                return next();
            });
        }
    });
};

exports.logout = function(req, res, next) {
	req.logout();
	res.json({
		success: true
	});
	next();
};

exports.authenticate = function(req, res, next) {
	session.load(req.session.sid, function(err, data){
    	if(err || !data) {
    		return next(new restify.Error("Not logged in or session timed out"));
    	}
    	req.user = data;
    	next();
	});
};

exports.getDetails = function(req, res, next) {
	res.json({
		success: true,
		data: req.user
	});
	return next();
};
var restify = require('restify');
session = require('../config/session.js');
var User = require('./models/user.js');

exports.login = function(req, res, next) {
	User.findOne({ 'email' :  req.body.email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
        	return next(err);

        // if no user is found, return the message
        if (!user || !user.validPassword(req.body.password))
            return next(new restify.ForbiddenError({ body:{
				success: false,
				errors: [],
				message: 'Invalid password or email.',
			}}));

        session.save(req.session.sid, user, function(err, status){
        	// all is well, return successful user
	        res.json({
	        	success: true,
	        	data: {
	        		user: user,
	        		sid: req.session.sid
	        	}
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
            return next(new restify.ForbiddenError({ body:{
				success: false,
				errors: [],
				message: 'That email is already taken.',
			}}));
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
    	if(err) 
    	    return next(err);
    	

    	if(!data || !data.email) {
    		return next(new restify.ForbiddenError({body:{
    			success: false,
    			message: "You need to be logged in"}}));
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

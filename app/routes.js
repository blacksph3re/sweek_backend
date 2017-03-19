var intern = require('./intern.js');
var user = require('./user.js');
var application = require('./application.js');

// app/routes.js
module.exports = function(app) {
	app.get('/', function(req, res, next) {
		res.json({
			success: true,
			message: 'Hey'
		});
		return next();
	});

	// process the login form
	app.post('/login', user.login);
	app.post('/signup', user.signup);
	app.get('/logout', user.logout);

	// TODO uncomment
	//app.use(user.authenticate);

	app.get('/user', [user.authenticate, user.getDetails]);
	app.get('/user/applications', application.myApplications);
	app.put('/user/applications', application.editApplications);

	app.get('/intern', intern.getInterns);
	app.post('/intern', intern.addIntern);
	app.get('/categories', intern.getCategories);

	app.use(intern.getSingleIntern);
	app.get('/intern/{url}', intern.getInternDetails);
	//app.put('/intern/{url}', intern.setInternDetails);
	app.post('/intern/{url}/application', application.apply);

};



var restify = require('restify');
var Intern = require('./models/intern.js');

exports.getInterns = function(req, res, next) {
	console.log("Halo");

	Intern.find({}, function(err, data) {
		console.log("Halo");

		if(err) {
			return next(new resify.InternalError({ body:{
				success: false,
				errors: [err],
				message: 'Could not list interns.',
			}}));
		}

		res.json({
			success: true,
			data: data,
		});
		return next();
	});
};

exports.addIntern = function(req, res, next) {
	if(req.user.isAdmin) {
		return next(new Error('You are not allowed to perform this operation'));
	}

	var newintern = new Intern(req.body);
	Intern.save(function(err) {
		res.json({
			success: true,
			message: 'Intern successfully created'
		});
		return next();
	});
};

exports.getCategories = function(req, res, next) {
	Intern.find({}, function(err, data) {
		if(err) {
			res.json({
				success: false,
				errors: [err],
				message: 'Could not list interns.',
			});
			res.status(500);
			return next();
		}

		// loop through all interns and add that to categories
		var categories = [];
		var findOrAdd = (prop, val) => {
			var found = categories.some((item, index, categories) => {
				// Add value to property
				if(item.name == prop) {
					if(!item.values.some((i) => i == val))
						item.values.push(val);
					return true;
				}
				return false;
			});
			if(!found) {
				categories.push({
					name: prop,
					values: [val]
				});
			}
		};

		const properties = ["city", "name", "title", "salary", "date", "duration"];

		data.forEach((item) => {
			properties.forEach((property) => {
				findOrAdd(property, item.data[property]);
			});
		});


		res.json({
			success: true,
			data: categories
		});
		res.status(200);
		return next();
	});
};

exports.getSingleIntern = function(req, res, next) {
	Intern.findOne({id: req.params.id}).exec(function(err, res) {
		if(err)
			next(err);

		res.json({
			success: true,
			data: res
		});
		next();
	});
};
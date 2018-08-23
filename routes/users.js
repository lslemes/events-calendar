var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Event = require('../models/event');

router.get('/create', function(req, res, next) {
	res.render('signup');
});

router.post('/', function(req, res, next) {
	var newUser = new User();

	newUser.username = req.body.username;
	newUser.password = req.body.password;

	newUser.save(function(err, savedUser) {
		res.redirect('/');
	});
});

router.get('/:id/:yyyy/:mm', function(req, res, next) {
	if (req.session.user && req.session.user._id === req.params.id) {
		var firstDay = new Date(req.params.yyyy, req.params.mm, 1);
		var lastDay = new Date(req.params.yyyy, Number(req.params.mm) + 1, 0);
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		var obj = { month: monthNames[req.params.mm], mm: req.params.mm, yyyy: req.params.yyyy, weekDayFirstDay: firstDay.getDay(), numberOfDays: lastDay.getDate() };

		Event.find({ user: req.session.user._id }, function(err, events) {
			res.render('panel', {obj: obj, evt: events});
		});
	}
	else {
		res.redirect('/');	
	}
});

module.exports = router;

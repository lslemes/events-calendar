var express = require('express');
var router = express.Router();

var User = require('../models/user');

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

router.get('/:id', function(req, res, next) {
	if (req.session.user && req.session.user._id === req.params.id) {
		var today = new Date();
		var mm = today.getMonth();
		var yyyy = today.getFullYear();
		var firstDay = new Date(yyyy, mm, 1);
		var lastDay = new Date(yyyy, mm + 1, 0);
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		var obj = { month: monthNames[today.getMonth()], year: yyyy, weekDayFirstDay: firstDay.getDay(), numberOfDays: lastDay.getDate() };

		console.log();
		console.log();
		console.log();
		console.log();
		console.log();
		console.log(obj);
		res.render('panel', {obj: obj});
	}
	res.redirect('/');
});

module.exports = router;

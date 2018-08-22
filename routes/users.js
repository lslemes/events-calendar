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
		res.render('panel');
	}
	res.redirect('/');
});

module.exports = router;

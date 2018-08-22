var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res, next) {
	if (req.session.user) {
		res.redirect('/users/' + req.session.user._id);
	}
	res.render('index');
});

router.post('/signin', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({ username: username, password: password }, function(err, user) {
		if (user) {
			req.session.user = user;
			res.redirect(user.url);
		}
		else {
			res.redirect('/');
		}
	});
});

router.get('/signout', function(req, res, next) {
	req.session.destroy();
	res.redirect('/');
});

router.get('/signup', function(req, res, next) {
	res.redirect('users/create');
});

module.exports = router;

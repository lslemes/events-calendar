var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Event = require('../models/event');

router.get('/create', function(req, res, next) {
	res.render('newevent');
});

router.post('/', function(req, res, next) {
	var newEvent = new Event();

	newEvent.description = req.body.description;
	newEvent.begin = req.body.begindate + 'T' + req.body.begintime + ':00';
	newEvent.end = req.body.enddate + 'T' + req.body.endtime + ':00';
	newEvent.user = req.session.user._id;

	newEvent.save(function(err, savedEvent) {
		res.redirect('/');
	});
});

router.get('/:id/edit', function(req, res, next) {
	Event.findById(req.params.id, function(err, event) {
		res.render('editevent', {event: event});
	});
});

router.get('/:id', function(req, res, next) {
	Event.findById(req.params.id, function(err, event) {
		res.render('event', {event: event});
	});
});

router.delete('/:id', function(req, res, next) {
	Event.findByIdAndDelete(req.params.id, function() {
		res.sendStatus(200);
	});
});

router.put('/:id', function(req, res, next) {
	Event.findByIdAndUpdate(req.params.id, req.body, function() {
		res.sendStatus(200);
	});
});

module.exports = router;

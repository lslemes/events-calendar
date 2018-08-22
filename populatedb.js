#! /usr/bin/env node

console.log('This script populates some test users and events to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
		console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
		return;
}

var async = require('async');
var User = require('./models/user');
var Event = require('./models/event');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];
var events = [];

function userCreate(username, password, cb) {
	var user = new User({ username: username, password: password });

	user.save(function (err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log('New User: ' + user);
		users.push(user);
		cb(null, user);
	}  );
}

function eventCreate(description, begin, end, user, cb) {
	var event = new Event({ description: description, begin: begin, end: end, user: user });

	event.save(function (err) {
		if (err) {
			cb(err, null);
			return;
		}
		console.log('New Event: ' + event);
		events.push(event);
		cb(null, event);
	}  );
}

function createUsers(cb) {
	async.parallel([
		function(callback) {
			userCreate('leo', '123', callback);
		},
		function(callback) {
			userCreate('dan', '123', callback);
		},
	], cb);
}

function createEvents(cb) {
	async.parallel([
		function(callback) {
			eventCreate('Wedding', '2018-08-26T14:00:00Z', '2018-08-26T20:00:00Z', users[0], callback);
		},
		function(callback) {
			eventCreate('Birthday', '2018-08-27T16:00:00Z', '2018-08-27T20:00:00Z', users[0], callback);
		},
		function(callback) {
			eventCreate('Seminar', '2018-08-30T14:00:00Z', '2018-08-30T15:00:00Z', users[1], callback);
		}
	], cb);
}

async.series([
	createUsers,
	createEvents
],
function(err, results) {
	if (err) {
		console.log('FINAL ERR: ' + err);
	}
	mongoose.connection.close();
});
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type: String},
	password: {type: String}
});

UserSchema
.virtual('url')
.get(function() {
	var today = new Date();
	return '/users/' + this._id + '/' + today.getFullYear() + '/' + today.getMonth();
});

module.exports = mongoose.model('User', UserSchema);
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type: String},
	password: {type: String},
	event: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

UserSchema
.virtual('url')
.get(function() {
	return '/users/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);
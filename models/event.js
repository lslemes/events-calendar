var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema({
	description: {type: String},
	begin: {type: Date},
	end: {type: Date},
	user: {type: Schema.Types.ObjectId, ref: 'User'}
});

EventSchema
.virtual('url')
.get(function() {
	return '/events/' + this._id;
});

module.exports = mongoose.model('Event', EventSchema)
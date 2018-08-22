var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema({
	description: {type: String},
	begin: {type: Date},
	end: {type: Date},
});

EventSchema
.virtual('url')
.get(function() {
	return '/events/' + this._id;
});

module.exports = mongoose.model('Event', EventSchema)
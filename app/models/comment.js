// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');
var Bottlecap = require('./bottlecap');

// user schema
var CommentSchema = new Schema({
	cap: { type: Schema.ObjectId, required: true, ref: 'Bottlecap'},
	user: { type: Schema.ObjectId, required: true, ref: 'User'},
	commentBody: { type: String, required: true}
});

// return the model
module.exports = mongoose.model('Comment', CommentSchema);

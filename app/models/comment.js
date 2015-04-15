// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var CommentSchema = new Schema({
	cap: { type: Schema.ObjectId, required: true},
	user: { type: Schema.ObjectId, required: true},
	commentBody: { type: String, required: true}
});

// return the model
module.exports = mongoose.model('Comment', CommentSchema);

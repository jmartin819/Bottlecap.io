// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema
var BottlecapSchema = new Schema({
	beername: { type: String, required: true},
	beerdate: { type: String, required: true},
	dateCreated: {type: String, required: true},
	avgColor: { type: String, required: true},
	commentID: {type: Schema.ObjectId}
});

// return the model
module.exports = mongoose.model('Bottlecap', BottlecapSchema);

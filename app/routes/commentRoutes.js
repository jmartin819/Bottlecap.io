var Comment = require('../models/comment');
var User = require('../models/user');
var Bottlecap = require('../models/bottlecap');
var ObjectId = require('mongoose').Types.ObjectId;

exports.postComment = function(req, res){

	var comment = new Comment();

	comment.cap = req.body.cap_id;
	comment.user = req.body.user_id;
	comment.commentBody = req.body.commentBody;

	comment.save(function(err) {
		if(err) return res.send(err);

		User.findById(comment.user, function(err,user){
			if (err) return res.send(err);

			user.comments.push(comment._id);
			console.log(user.comments);

			user.save(function(err) {
			if(err)	return res.send(err);
			})

		});

		Bottlecap.findById(comment.cap, function(err,cap){
			if (err) return res.send(err);

			cap.commentID.push(comment._id);

			cap.save(function(err) {
			if(err)	return res.send(err);
			})

		});

		res.json({ message: 'New comment created!' });
	});

};

exports.getComments = function(req, res){

	Comment.find(function(err, comments){
		if(err) res.send(err);

		res.json(comments);
		});
};

exports.getComments_byCap = function(req, res){

	Comment.find(function(err, comments){
		if(err) res.send(err);

		res.json(comments);
		});
};

exports.getComments_byUser = function(req, res){

	//console.log("req.params.cap_id");
	Comment.find( { user: ObjectId(req.params.user_id) }, function(err, comments){
		if(err) res.send(err);

		res.json(comments);
		});
};
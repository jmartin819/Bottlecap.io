var Comment = require('../models/comment');

exports.postComment = function(req, res){

	var comment = new Comment();

	comment.cap = req.body.cap_id;
	comment.user = req.body.user_id;
	comment.commentBody = req.body.commentBody;
	

	comment.save(function(err) {
		if(err) return res.send(err);

		res.json({ message: 'New comment created!' });
	});
};

exports.getComments = function(req, res){

	Comment.find(function(err, comments){
		if(err) res.send(err);

		res.json(comments);
		});
};
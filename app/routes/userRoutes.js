var User = require('../models/user');

exports.postUsers = function(req, res){

	var user = new User();

	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.dateofBirth = req.body.dateofBirth;
	user.username = req.body.username;
	user.password = req.body.password;

	user.save(function(err) {
		if(err) {
			if(err.code == 11000)
				return res.json({ success: false, message: 'A user with that username already exists. '});
			else
				return res.send(err);
		}

		res.json({ message: 'New user created!' });
	});
};

exports.getUsers = function(req, res){

	User.find(function(err, users){
		if(err) res.send(err);

		res.json(users);
		});
};

exports.getOneUser = function(req,res){
	User.findOne({username: req.params.user_username}, function(err, user){
		if (err) return res.send(err);

		res.json(user);
	});
};

exports.addFollower = function(req, res){
	User.findOne({username: req.params.user_username}, function(err,user){
		if (err) return res.send(err);

		var alreadyFollowed = false;

		for (var i=0; i<user.follows.length; i++)
		{
			if (user.follows[i] == req.body.username)
			{
				alreadyFollowed = true;
			}
		}

		if (req.body.username == null)
		{ alreadyFollowed = true; }

		if (alreadyFollowed == false)
		{ user.follows.push(req.body.username); }

		user.save(function(err) {
		if(err)	return res.send(err);
		})

		res.json({ message: 'Change saved!' });

	});
};

exports.likeCap = function(req, res){
	User.findOne({username: req.params.user_username}, function(err,user){
		if (err) return res.send(err);

		var alreadyLiked = false;

		for (var i=0; i<user.capLikes.length; i++)
		{
			if (user.capLikes[i] == req.body.cap_id)
			{
				alreadyLiked = true;
			}
		}

		if (req.body.cap_id == null)
		{ alreadyLiked = true; }

		if (alreadyLiked == false)
		{ user.capLikes.push(req.body.cap_id); }

		user.save(function(err) {
		if(err)	return res.send(err);
		})

		res.json({ message: 'Change saved!' });

	});
};

exports.postComment = function(req, res){

	User.findOne({username: req.params.user_username}, function(err,user){
		if (err) return res.send(err);

		var tempComment = {};

		tempComment.commentBody = req.body.commentBody;
		tempComment.dateSubmitted = req.body.dateSubmitted;
		tempComment.cap = req.body.cap;

		console.log("tempComment: ");
		console.log(tempComment);

		user.comments.push(tempComment);

		user.save(function(err) {
		if(err)	return res.send(err);

		res.json({ message: 'Comment posted!' });
		});

		

	});
};
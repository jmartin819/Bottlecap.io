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
	console.log("in userRoutes");
	User.findOne({username: req.params.user_username}, function(err,user){
		if (err) return res.send(err);

		console.log(user.follows);

		user.follows.push(req.body.username);

		console.log(user.follows);

		user.save(function(err) {
		if(err)	return res.send(err);
		})

		res.json({ message: 'Follower added!' });

	});
};


	/*user.save(function(err) {
		if(err) {
			if(err.code == 11000)
				return res.json({ success: false, message: 'A user with that username already exists. '});
			else
				return res.send(err);
		}

		res.json({ message: 'Follower added!' });
	});
};*/
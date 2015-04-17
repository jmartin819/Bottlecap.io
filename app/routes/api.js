var jwt = require('jsonwebtoken');
var config = require('../../config');

var superSecret = config.secret;

var User = require('../models/user');
var Bottlecap = require('../models/bottlecap')
var Comment = require('../models/comment')

var userRoutes = require('./userRoutes');
var capRoutes =  require('./capRoutes');
var commentRoutes = require('./commentRoutes');

module.exports = function(app, express) {
	var apiRouter = express.Router();

	apiRouter.post('/users', userRoutes.postUsers);
	apiRouter.route('/bottlecaps')
		.get(capRoutes.getBottlecaps);

	apiRouter.route('/bottlecaps/:cap_id')
		.get(capRoutes.getOneCap);

	apiRouter.post('/authenticate', function(req, res){

	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err, user){

		console.log("Authenticating: " + req.body.username);

		if(err) throw err;

		//no user with that username found
		if(!user) {
			console.log("Authentication of " + req.body.username + "failed: no user found");
			res.json({
				success: false,
				message: 'Authetication failed. User not found.'
			});
		} else if (user) {

			//check if password matches
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword) {
				console.log("Authentication of " + req.body.username + "failed: wrong password");
				res.json({
					success: false,
					message: 'Authentication failed. Wrong password.'
				});
			} else {

				//if user is found and password is right
				//create token
				var token = jwt.sign({
					name: user.firstName,
					username: user.username
				}, superSecret, {
					expiresInMinutes: 1440 //24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

	//middleware to use for all requests
apiRouter.use(function(req, res, next){
		//do logging
		console.log('API middleware');

		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		// decode token
		if(token) {
			jwt.verify(token, superSecret, function(err, decoded){
				if(err) {
					return res.status(403).send({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					//if everything is good, save to request for use in other routes
					req.decoded = decoded;

					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}

		//more middle ware
		//next();
	});
	// more routes for our API will happen here

	apiRouter.route('/users')
		//.post(userRoutes.postUsers)
		.get(userRoutes.getUsers);

	apiRouter.route('/bottlecaps')
		//.get(capRoutes.getBottlecaps)
		.post(capRoutes.postBottlecap);

	apiRouter.route('/comments')
		.get(commentRoutes.getComments)
		.post(commentRoutes.postComment);

	apiRouter.route('/comments/:user_id/byUser')
		.get(commentRoutes.getComments_byUser);

	apiRouter.route('/comments/:cap_id/byCap')
		.get(commentRoutes.getComments_byCap);

	apiRouter.route('/users/:user_username')
		.get(userRoutes.getOneUser);

	apiRouter.route('/users/:user_id/byId')
		.get(userRoutes.getOneUserById);

	apiRouter.route('/users/:user_username/addFollower')
		.put(userRoutes.addFollower);

	apiRouter.route('/users/:user_username/likeCap')
		.put(userRoutes.likeCap);

	apiRouter.route('/users/:user_username/postComment')
		.post(userRoutes.postComment);

	apiRouter.route('/me').get(function(req,res){
		res.send(req.decoded);
	});

	return apiRouter;
};
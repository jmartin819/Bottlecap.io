var Comment = require('../models/comment');
var User = require('../models/user');
var Bottlecap = require('../models/bottlecap');
var ObjectId = require('mongoose').Types.ObjectId;

exports.searchByUser = function(req, res){

	console.log(req.params.searchstring);
	
	//User.find( { username: req.params.searchstring}, function(err, users){
	//db.users.find(name: new RegExp(search));
	User.find( { username: new RegExp(req.params.searchstring, "i")}, function(err, users){
		if(err) res.send(err);

		console.log(users);

		res.json(users);
		});
};

exports.searchByCap = function(req, res){

	console.log(req.params.searchstring);
	
	Bottlecap.find( { beername: new RegExp(req.params.searchstring, "i")}, function(err, caps){
		if(err) res.send(err);

		console.log(caps);

		res.json(caps);
		});
};

exports.searchByColor = function(req, res){

	console.log(req.params.searchstring);
	
	Bottlecap.find( { avgColor: new RegExp(req.params.searchstring, "i")}, function(err, caps){
		if(err) res.send(err);

		console.log(caps);

		res.json(caps);
		});
};
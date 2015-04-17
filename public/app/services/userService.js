angular.module('userService', [])

.factory('userFactory', function($http) {

	// create the object
	var localUserFactory = {};

	// a function to get all the stuff
	localUserFactory.all = function(){
		return $http.get('/api/users');
	};

	//create new user
	localUserFactory.create = function(userData){
		console.log("userData: " + userData);
		return $http.post('/api/users', userData);
	};

	localUserFactory.get = function(username){
		return $http.get('/api/users/' + username);
	};

	localUserFactory.getOneUserById = function(user_id){
		return $http.get('/api/users/' + user_id + '/byId');
	};
	
	localUserFactory.addFollower = function(curUser, username){
		username = {username: username};
		return $http.put('/api/users/' + curUser + '/addFollower', username);
	};

	localUserFactory.likeCap = function(curUser, cap_id){
		cap_id = {cap_id: cap_id};
		return $http.put('/api/users/' + curUser + '/likeCap', cap_id);
	};

	return localUserFactory;

});

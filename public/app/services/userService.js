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

	localUserFactory.addFollower = function(curUser, username){
		console.log("addFollower: " + username + " to user: " + curUser);
		username = {username: username};
		return $http.put('/api/users/' + curUser, username);
	};

	return localUserFactory;

});

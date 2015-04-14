angular.module('capsService', [])

.factory('capsFactory', function($http, $resource) {

	// create the object
	var localCapsFactory = {};

	// a function to get all the stuff
	localCapsFactory.all = function(){
		return $http.get('/api/bottlecaps');
	};

	localCapsFactory.getOneCap = function(cap_id){
		return $http.get('/api/bottlecaps/' + cap_id);
	};

	//create new tag entry
	localCapsFactory.create = function(capsData){
		return $http.post('/api/bottlecaps', capsData);
	};

	return localCapsFactory;

});
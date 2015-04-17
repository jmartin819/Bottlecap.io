angular.module('searchService', [])

.factory('searchFactory', function($http, $resource) {

	// create the object
	var localSearchFactory = {};

	// a function to get all the stuff
	
	localSearchFactory.searchByUsers = function(searchparams){
		console.log(searchparams);
		return $http.get('/api/search/' + searchparams + '/byUser');
	};

	localSearchFactory.searchByCap = function(searchparams){
		console.log(searchparams);
		return $http.get('/api/search/' + searchparams + '/byCap');
	};

	localSearchFactory.searchByColor = function(searchparams){
		console.log(searchparams);
		return $http.get('/api/search/' + searchparams + '/byColor');
	};

	return localSearchFactory;

});
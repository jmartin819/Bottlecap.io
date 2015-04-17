angular.module('searchController', [
	'searchService',
	'capsService',
	'userService'
	])

.controller('searchController', function($routeParams, searchFactory, userFactory, capsFactory){
	var vm = this;

	console.log($routeParams);

	var searchString = $routeParams.searchstring;
	var searchBy = $routeParams.searchby;
	
	if(searchBy == "user"){
		if(typeof(searchString) == "undefined"){
			userFactory.all()
				.success(function(data){
				vm.searchResults  = data;
			});
		}
		else{
		searchFactory.searchByUsers(searchString)
			.success(function(data){
				vm.searchResults  = data;
			});
		}
	}
	else if(searchBy == "capColor"){
		if(typeof(searchString) == "undefined"){
			capsFactory.all()
				.success(function(data){
				vm.searchResults  = data;
			});
		}
		else{
		searchFactory.searchByColor(searchString)
			.success(function(data){
				vm.searchResults  = data;
			});
		}
	}
	else if(searchBy == "beer"){
		if(typeof(searchString) == "undefined"){
			capsFactory.all()
				.success(function(data){
				vm.searchResults  = data;
			});
		}
		else{
		searchFactory.searchByCap(searchString)
			.success(function(data){
				vm.searchResults  = data;
			});
		}
	}
	else
	{
		vm.searchResults = {};
	}
});
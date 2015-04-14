angular.module('mainCtrl', [
	'capsService'
	])

.controller('mainController', function($rootScope, $location, Auth, capsFactory){
	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();
		
		if(vm.loggedIn)
		{
			Auth.getUser()
				.success(function(data){
					vm.user = data;
					//console.log(vm.user);
				});
		}
	});

	//var bottlecapsList = [];

	capsFactory.all()
		.success(function(data){
			vm.bottlecapsList = data;
			//console.log(vm.bottlecapsList);

			/*
			for(var key in vm.bottlecapsList){
			bottlecapsList.push({name: vm.bottlecapsData[key].beername});
			
			}
			*/
			
		});
	//console.log(vm.bottlecapsList);

	vm.setCapColor = function(color){
		//console.log("call to set color");
		//console.log(color);

		vm.bgColor = "#" + color.avgColor;
		//console.log(vm.bgColor);

		var returnColor = { color: "#" + color.avgColor };

		return returnColor;
	};

	vm.doLogin = function(){
		vm.processing = true;

		vm.error = '';

		if(vm.loginData.username && vm.loginData.password)
		{

			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data){

					vm.processing = false;

					if(data.success)
						$location.path('/');
					else
						vm.error = data.message;
				});

		}
		else
		{
			vm.error = "Either no username or password provided!"
			vm.processing = false;
		}
	};

	vm.doLogout = function() {
		Auth.logout();
		$location.path('/');
	};

});
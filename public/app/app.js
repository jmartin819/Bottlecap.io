// name our angular app
angular.module('mainApp', [
  'ngResource',
  'app.routes',
  'authService',
  'mainCtrl',
  'userService',
  'ngAnimate'
  ])

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
})

.config(['$resourceProvider', function($resourceProvider){
  $resourceProvider.defaults.stripTrailingSlashes = false;
}])

.controller('profileController', function(Auth, $location, $routeParams, userFactory){
  var vm = this;

  vm.profileCheck = Auth.isLoggedIn();
  console.log(vm.profileCheck);
  if (!vm.profileCheck)
  {
    $location.path('/login');
  }
  else {
    userFactory.get($routeParams.user_username)
    .success(function(data){
      vm.user = data;

      console.log(vm.user);
    });
  }
})

//new user controller
.controller('newUserController', function(userFactory){
  var vm = this;

  vm.saveUser = function(){
    vm.processing = true;
    vm.message = ' ';

    userFactory.create(vm.userData)

    .success(function(data){

      vm.processing = false;

      vm.userData = {};
      vm.message = data.message;
      console.log('post user worked');
    });

  }
});
// name our angular app
angular.module('mainApp', [
  'ngResource',
  'app.routes',
  'authService',
  'mainCtrl',
  'userService',
  'ngAnimate',
  'capsService'
  ])

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
})

.config(['$resourceProvider', function($resourceProvider){
  $resourceProvider.defaults.stripTrailingSlashes = false;
}])

.controller('profileController', function($routeParams, userFactory){
  var vm = this;

    userFactory.get($routeParams.user_username)
    .success(function(data){
      vm.user = data;

      console.log(vm.user);
    });

  vm.addFollower = function(curUser, username){
    console.log(curUser);
    console.log(username);
    vm.currentUser = curUser;
    vm.followedUser = username;

    userFactory.addFollower(vm.currentUser, vm.followedUser)
    .success(function(data){
      vm.returndata = data;
      console.log(vm.returndata);
      console.log("worked....?");
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
})

.controller('capDetailController', function($routeParams, capsFactory){

  var vm = this;

  capsFactory.getOneCap($routeParams.cap_id)
    .success(function(data){
      vm.bottlecap = data;

      console.log(vm.bottlecap);
    });
});
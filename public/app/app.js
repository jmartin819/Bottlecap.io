// name our angular app
angular.module('mainApp', [
  'ngResource',
  'app.routes',
  'authService',
  'mainCtrl',
  'searchController',
  'userService',
  'ngAnimate',
  'capsService',
  'commentService'
  ])

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
})

.config(['$resourceProvider', function($resourceProvider){
  $resourceProvider.defaults.stripTrailingSlashes = false;
}])

.controller('profileController', function($routeParams, userFactory, commentFactory){
  var vm = this;

    userFactory.get($routeParams.user_username)
    .success(function(data){
      vm.user = data;

      console.log(vm.user.capLikes);

      commentFactory.getByUser(vm.user._id)
      .success(function(data){
        vm.comments = data;
        //console.log("Comments?");
        //console.log(vm.comments);
      });
    });



  vm.addFollower = function(curUser, username){
    vm.currentUser = curUser;
    vm.followedUser = username;

    userFactory.addFollower(vm.currentUser, vm.followedUser)
    .success(function(data){
      vm.returndata = data;
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

.controller('capDetailController', function($routeParams, capsFactory, userFactory, commentFactory){

  var vm = this;

  capsFactory.getOneCap($routeParams.cap_id)
  .success(function(data){
    vm.bottlecap = data;
    //console.log(vm.bottlecap);
  });

  commentFactory.getByCap($routeParams.cap_id)
  .success(function(data){
    vm.comments = data;
  });

  vm.postNewComment = function(curUser){
    vm.newComment.cap_id = $routeParams.cap_id;

    userFactory.get(curUser)
    .success(function(data){
      console.log(data);
      vm.newComment.user_id = data._id;
      console.log(vm.newComment);

      commentFactory.create(vm.newComment)
      .success(function(data){

        vm.newComment = {};
        console.log('Comment posted.');

        commentFactory.getByCap($routeParams.cap_id)
        .success(function(data){
          vm.comments = data;
        });

      });

    });
  }

  vm.likeCap = function(curUser, cap_id){
    vm.currentUser = curUser;
    vm.likedCap = cap_id;

    userFactory.likeCap(vm.currentUser, vm.likedCap)
    .success(function(data){
      vm.returndata = data;
    });
  }
  
});
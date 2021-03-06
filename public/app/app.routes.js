// inject ngRoute for all our routing needs
angular.module('app.routes', ['ngRoute'])

// configure our routes
.config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    
    $routeProvider

        // route for the home page
        .when('/index', {
            templateUrl: '../views/index.html',
            controller: 'mainController',
            controllerAs: 'main'
        })

        .when('/searchResults', {

            templateUrl: '../views/searchResults.html',
            controller: 'searchController',
            controllerAs: 'search'
        })

        .when('/newUser', {
            templateUrl: '../views/newUser.html',
            controller: 'newUserController',
            controllerAs: 'newUser'
        })

        .when('/profile/:user_username', {
            templateUrl: '../views/profile.html',
            controller: 'profileController',
            controllerAs: 'profile'
        })

        .when('/caps/:cap_id', {
            templateUrl: '../views/capDetail.html',
            controller: 'capDetailController',
            controllerAs: 'cap'
        })

        .when('/login', {
            templateUrl: '../views/login.html',
            controller : 'mainController',
            controllerAs : 'login'
        })

        .when('/', {
            templateUrl: '../views/home.html',
            controller : 'mainController',
            controllerAs : 'main'
        })

        .otherwise({
            templateUrl: '../views/404.html'
        });
    
});
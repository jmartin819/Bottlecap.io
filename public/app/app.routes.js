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

        /*.when('/home/:patient_id', {
            templateUrl: '../views/singlePatient.html',
            controller: 'SPController',
            controllerAs: 'singlePatient'
        })*/

        .when('/newUser', {
            templateUrl: '../views/newUser.html',
            controller: 'newUserController',
            controllerAs: 'newUser'
        })

        .when('/login', {
            templateUrl: '../views/login.html',
            controller : 'mainController',
            controllerAs : 'login'
        })

        .when('/', {
            templateUrl: '../views/cover.html',
            controller : 'mainController',
            controllerAs : 'cover'
        });
    
});
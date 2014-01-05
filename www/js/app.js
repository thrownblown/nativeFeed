var sideMenuApp = angular.module('sideMenuApp', ['ionic', 'ngRoute', 'sideMenuApp.controllers', 'sideMenuApp.services']);

sideMenuApp.config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

sideMenuApp.config(['$routeProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/one', {
            controller: 'OneController',
            templateUrl: 'templates/one.html'
        })
        .when('/two', {
            controller: 'TwoController',
            templateUrl: 'templates/two.html'
        })
        .when('/three', {
            controller: 'ThreeController',
            templateUrl: 'templates/three.html'
        })
        .otherwise({ redirectTo: '/one' });
}]);
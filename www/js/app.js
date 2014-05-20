var blackBoxApp = angular.module('blackBoxApp', [
    'ionic', 
    'blackBoxApp.controllers', 
    'blackBoxApp.services', 
    'leaflet-directive',
    'angularMoment']);

blackBoxApp.config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

blackBoxApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('chat', {
            url: '/chat',
            controller: 'OneController',
            templateUrl: 'templates/one.html'
        })
        .state('two', {
            url: '/two',
            controller: 'TwoController',
            templateUrl: 'templates/two.html'
        })
        .state('three', {
            url: '/three',
            controller: 'ThreeController',
            templateUrl: 'templates/three.html'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/chat');
    }
])


// 'use strict';

// var app = angular.module('feedApp', [
//   'ngCookies',
//   'ngResource',
//   'ngRoute',
//   'ngSanitize',
//   'ngTouch',
//   // 'mgcrea.pullToRefresh',
//   'angularMoment'
// ])
//   .config(function ($routeProvider, $locationProvider, $httpProvider) {
//     $routeProvider
//       .when('/', {
//         templateUrl: 'partials/main',
//         authenticate: true,
//         controller: 'MainCtrl'
//       })
//       .when('/login', {
//         templateUrl: 'partials/login',
//         controller: 'LoginCtrl'
//       })
//       .when('/signup', {
//         templateUrl: 'partials/signup',
//         controller: 'SignupCtrl'
//       })
//       .when('/settings', {
//         templateUrl: 'partials/settings',
//         controller: 'SettingsCtrl',
//         authenticate: true
//       })
//       .otherwise({
//         redirectTo: '/'
//       });
      
//     $locationProvider.html5Mode(true);
      
//     // Intercept 401s and redirect you to login
//     $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
//       return {
//         'responseError': function(response) {
//           if(response.status === 401) {
//             $location.path('/login');
//             return $q.reject(response);
//           }
//           else {
//             return $q.reject(response);
//           }
//         }
//       };
//     }]);
//   })
//   .run(function ($rootScope, $location, $http, Auth) {
//     // Redirect to login if route requires auth and you're not logged in
//     $rootScope.$on('$routeChangeStart', function (event, next) {
//       if (next.authenticate && !Auth.isLoggedIn()) {
//         $location.path('/login');
//       }
//     });
//   });



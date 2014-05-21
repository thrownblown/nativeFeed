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
        .state('map', {
            url: '/map',
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


blackBoxApp.directive('charLimit', function() { // MOVE DIRECTIVES TO A SEPARATE FILE?
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            var limit = attrs.charLimit;
            elem.bind('keyup', function(event) {
                var length = elem.val().length;
                feedbackPerLength(length); // Color the field if text too long.
            });
            elem.bind('keypress', function(event) {
                if (elem.val().length >= limit) {
                    if (event.keyCode !== 8) { // Prevent non-backspace keypresses if length exceeds limit.
                        event.preventDefault();
                    }
                }
            });
        }
    };
});

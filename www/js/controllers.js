angular.module('sideMenuApp.controllers', [])

    .controller('MenuController', function ($scope, MenuService) {
        // "MenuService" is a service returning mock data (services.js)
        $scope.list = MenuService.all();

        $scope.toggleLeft = function () {
            $scope.sideMenuController.toggleLeft();
        };
    })

    .controller('OneController', function ($scope) {
        $scope.title = "Page One Title";
    })

    .controller('TwoController', function ($scope) {
        $scope.title = "Page Two Title";
    })

    .controller('ThreeController', function ($scope) {
        $scope.title = "Page Three Title";
    });

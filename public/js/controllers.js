'use strict';

/* Controllers */

var wfApp = angular.module("wfApp.controllers", []);

wfApp.controller("wfIndexCtrl", function ($scope, $http) {
    $scope.menu = {
        list: [
            "Home"

        ],
        current: "Home"
    }
});

wfApp.controller("wfHomeCtrl", function ($scope, $http) {
});

wfApp.controller("wfSearchCtrl", function ($scope, $routeParams) {
    $scope.term = decodeURIComponent($routeParams.term);
});
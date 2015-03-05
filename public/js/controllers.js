'use strict';

/* Controllers */

var wfApp = angular.module("wfApp.controllers", ['wfApp.resources']);

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

wfApp.controller("wfSearchCtrl", function ($scope, $routeParams, Fish) {
    $scope.data = {
        fishs: []
    };

    Fish.search({'term':  decodeURIComponent($routeParams.term)}, function(data) {
        $scope.data.fishs = data;
    });
});
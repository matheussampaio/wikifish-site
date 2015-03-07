'use strict';

/* Controllers */

var wfApp = angular.module("wfApp.controllers", ['wfApp.resources']);

wfApp.controller("wfIndexCtrl", function ($scope) {
    $scope.menu = {
        list: [
            "Home"

        ],
        current: "Home"
    }
});

wfApp.controller("wfHomeCtrl", function ($scope) {
});

wfApp.controller("wfFishDetailCtrl", function ($scope, $routeParams, Fish) {
    $scope.data = {
        fish: []
    };

    Fish.get({'id':  decodeURIComponent($routeParams.id)}, function(fish) {
        $scope.data.fish = fish[0];
    });
});

wfApp.controller("wfSearchCtrl", function ($scope, $routeParams, Fish) {
    $scope.data = {
        fishs: []
    };

    Fish.search({'term':  decodeURIComponent($routeParams.term)}, function(data) {
        $scope.data.fishs = data;
    });
});
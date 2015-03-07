'use strict';

/* Controllers */

var wfApp = angular.module("wfApp.controllers", ['wfApp.resources']);

wfApp.controller("wfFishDetailCtrl", ($scope, $routeParams, Fish) => {
    $scope.data = {
        fish: []
    };

    Fish.get({'id':  decodeURIComponent($routeParams.id)}, (fish) => {
        $scope.data.fish = fish[0];
    });
});

wfApp.controller("wfSearchCtrl", ($scope, $routeParams, Fish) => {
    $scope.data = {
        fishs: []
    };

    Fish.search({'term':  decodeURIComponent($routeParams.term)}, (data) => {
        $scope.data.fishs = data;
    });
});
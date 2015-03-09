'use strict';

/* Controllers */

var wfApp = angular.module("wfApp.controllers", []);

wfApp.controller("wfFishDetailCtrl", ($scope, $routeParams, FishService, CommentsService) => {
    var fishid = decodeURIComponent($routeParams.id);
    $scope.vm = {};

    $scope.vm.fish = FishService.requestFish(fishid);
    $scope.vm.comments = CommentsService.requestComments(fishid);

    console.log('scope', $scope.user);
});

wfApp.controller("wfSearchCtrl", ($scope, $routeParams, Fish) => {
    $scope.vm = {
        fishs: []
    };

    Fish.search({'term':  decodeURIComponent($routeParams.term)}, (data) => {
        $scope.vm.fishs = data;
    });
});
'use strict';

/* Controllers */

var wfApp = angular.module("wfApp.controllers", []);


wfApp.controller("wfFishDetailCtrl", ($scope, $routeParams, FishService, CommentsService) => {
    var fishid = decodeURIComponent($routeParams.id);
    $scope.vm = {};

    $scope.vm.fishService = FishService.requestFish(fishid);
    $scope.vm.commentsService = CommentsService.requestComments(fishid);
});

wfApp.controller("wfSearchCtrl", ($scope, $routeParams, FishService, $location) => {
    $scope.vm = {};

    console.log('search', $location.search());

    $scope.vm.fishService = FishService.searchFish($location.search());
});
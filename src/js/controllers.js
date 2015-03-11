'use strict';

/* Controllers */

var wfApp = angular.module("wfApp.controllers", []);


wfApp.controller("wfFishDetailCtrl", ($scope, $routeParams, Fish, CommentsService) => {
    var fishid = decodeURIComponent($routeParams.id);
    $scope.vm = {};

    $scope.vm.fish = Fish.getFishByID(fishid).then((fish) => {
        $scope.vm.fish = fish;
    });

    $scope.vm.commentsService = CommentsService.requestComments(fishid);
});

wfApp.controller("wfSearchCtrl", ($scope, $location, Fish) => {
    $scope.vm = {};

    Fish.getFishByQuery($location.search()).then((fishs) => {
        $scope.vm.fishs = fishs;
    });

    $location.search('');
});
'use strict';

/* Controllers */

var wfApp = angular.module("wfApp.controllers", []);


wfApp.controller("wfFishDetailCtrl", ($scope, $routeParams, Fish, Comment) => {
    var fishID = decodeURIComponent($routeParams.id);

    $scope.vm = {};

    $scope.vm.fish = Fish.getFishByID(fishID).then((fish) => {
        $scope.vm.fish = fish;
    });

    Comment.getCommentsByFishID(fishID).then((comments) => {
        $scope.vm.comments = comments;
    });
});

wfApp.controller("wfSearchCtrl", ($scope, $location, Fish) => {
    $scope.vm = {};

    Fish.getFishByQuery($location.search()).then((fishs) => {
        $scope.vm.fishs = fishs;
    });

    $location.search('');
});
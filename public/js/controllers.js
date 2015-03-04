'use strict';

/* Controllers */

var wfApp = angular.module("wfApp.controllers", []);

var scp;
wfApp.controller("wfCtrl", function ($scope, $http) {
    scp = $scope;

    $scope.menu = {
        list: [
            "Home",
            "Catalog",
            "Others"
        ],
        current: "Home"
    }
});

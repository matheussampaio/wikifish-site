"use strict";

// Declare app level module which depends on filters, and services

var wfApp = angular.module("wfApp", ["ngRoute", "angular.filter", "wfApp.controllers", "wfApp.factories", "wfApp.filters", "wfApp.services", "wfApp.directives", "UserApp"]);

wfApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when("/", { templateUrl: "partials/index", controller: "wfIndexCtrl", "public": true });

    $routeProvider.when("/search", { templateUrl: "partials/search", controller: "wfSearchCtrl", "public": true });
    $routeProvider.when("/fish/:id", { templateUrl: "partials/fish_detail", controller: "wfFishDetailCtrl", "public": true });

    $routeProvider.when("/login", { templateUrl: "partials/login", login: true });
    $routeProvider.when("/signup", { templateUrl: "partials/signup", "public": true });

    $routeProvider.otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode(true);
});

wfApp.run(function (user) {
    user.init({ appId: "54fa33a3161df" });
});
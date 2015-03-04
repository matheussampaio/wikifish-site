'use strict';

// Declare app level module which depends on filters, and services

var wfApp = angular.module('wfApp', [
    'ngRoute',
    'wfApp.controllers',
    'wfApp.factory',
    'wfApp.filters',
    'wfApp.services',
    'wfApp.directives'
]);

wfApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/index',
            controller: 'wfCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});

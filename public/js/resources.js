'use strict';

var wfApp = angular.module('wfApp.resources', ['ngResource']);

wfApp.factory("Fish", function ($resource) {
    return $resource('/api/fish/:id', {}, {
        search: {
            method: 'GET',
            url : '/api/fish/search/:term',
            isArray: true
        },
        get: {
            isArray: true
        }
    });
});
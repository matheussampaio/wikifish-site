'use strict';

/* Filters */

var wfApp = angular.module('wfApp.filters', []);

wfApp.filter('interpolate', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
});

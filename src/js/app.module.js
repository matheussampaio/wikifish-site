(function () {
    'use strict';

    angular.module('wfApp', [
        'ngRoute',
        'ngResource',
        'angular.filter',
        'UserApp',

        'wfApp.filters',
        'wfApp.services',
        'wfApp.factories',
        'wfApp.directives',
        'wfApp.controllers'
    ]);

})();
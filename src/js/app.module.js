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
        'wfApp.new.directives',
        'wfApp.new.controllers',

        // DEPRECATED (WILL BE REMOVED):
        'wfApp.controllers',
        'wfApp.directives'
    ]);

})();
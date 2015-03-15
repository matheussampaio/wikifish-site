(function () {
    'use strict';

    angular.module('wfApp')
        .config(config)
        .run(userapp);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/index',
            public: true
        });

        $routeProvider.when('/search', {
            templateUrl: 'partials/searchResult',
            controller: 'wfSearchResultController',
            public: true
        });

        $routeProvider.when('/fish/:id', {
            templateUrl: 'partials/fish_detail',
            controller: 'wfFishDetailController',
            public: true
        });

        $routeProvider.when('/login', {
            templateUrl: 'partials/login',
            login: true
        });

        $routeProvider.when('/signup', {
            templateUrl: 'partials/signup',
            public: true
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }

    function userapp(user) {
        user.init({appId: '54fa33a3161df'});
    }

})();
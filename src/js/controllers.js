'use strict';

/* Controllers */

var wfApp = angular.module("wfApp.controllers", []);


wfApp.controller('wfIndexCtrl', ($scope) => {
    $scope.vm = {};

    $scope.vm.options = [
        {
            name: 'alimentation__in',
            title: 'Alimentação',
            values: [
                {title: 'Dry, packaged food', enum: 'DRY_PACKAGE_FOOD', value: true},
                {title: 'Live fish', enum: 'LIVE_FISH', value: true},
                {title: 'Live worms, Daphnia, etc.', enum: 'LIVE_WORMS', value: true},
                {title: 'Vegetarian', enum: 'VEGETARIAN', value: true}
            ]
        },
        {
            name: 'reproduction__in',
            title: 'Reprodução',
            values: [
                {title: 'Egglayer', enum: 'EGGYLAYER', value: true},
                {title: 'Livebearer', enum: 'LIVEBEARER', value: true},
                {title: 'Mouthbrooder', enum: 'MOUTHBROODER', value: true}
            ]
        }
    ];
});

wfApp.controller("wfFishDetailCtrl", ($scope, $routeParams, FishService, CommentsService) => {
    var fishid = decodeURIComponent($routeParams.id);
    $scope.vm = {};

    $scope.vm.fishService = FishService.requestFish(fishid);
    $scope.vm.commentsService = CommentsService.requestComments(fishid);
});

wfApp.controller("wfSearchCtrl", ($scope, $routeParams, FishService, $location) => {
    $scope.vm = {};

    console.log('search', $location.search());

    $scope.vm.fishService = FishService.searchFish($location.search());
});
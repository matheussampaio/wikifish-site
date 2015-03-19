(function () {
    'use strict';

    angular
        .module('wfApp.controllers')
        .controller('wfSearchResultController', SearchResultController);

    SearchResultController.$inject = ['$scope', '$location', 'Fish', '$location'];

    function SearchResultController($scope, $location, Fish) {
        $scope.vm = {};

        Fish.getFishByQuery($location.search()).then((fishs) => {
            $scope.vm.fishs = fishs;
        });

        $location.search('');
    }

})();
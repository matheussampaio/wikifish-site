(function () {
    'use strict';

    angular
        .module('wfApp.controllers')
        .controller('wfFishDetailController', FishDetailController);

    FishDetailController.$inject = ['$scope', '$routeParams', 'Fish', 'Comment'];

    function FishDetailController($scope, $routeParams, Fish, Comment) {
        var fishID = decodeURIComponent($routeParams.id);

        $scope.vm = {};

        $scope.vm.fish = Fish.getFishByID(fishID).then((fish) => {
            $scope.vm.fish = fish;
        });

        $scope.vm.commentsService = Comment.getCommentsByFishID(fishID);
    }

})();
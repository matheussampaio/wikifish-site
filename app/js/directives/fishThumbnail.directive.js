(function () {
    'use strict';

    angular
        .module('wfApp.directives')
        .directive('wfFishThumbnail', FishThumbnail);

    FishThumbnail.$inject = ['$location'];

    function FishThumbnail($location) {
        return {
            restrict: 'E',
            templateUrl: 'partials/wfFishThumbnail',
            scope: {
                fish: '=fish'
            },
            link: (scope) => {
                scope.gotoFishDetail = () => {
                    $location.path('/fish/' + scope.fish._id);
                };
            }
        };
    }

})();
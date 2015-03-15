(function () {
    'use strict';

    angular
        .module('wfApp.directives')
        .directive('wfFishThumbnail', FishThumbnail);

    FishThumbnail.$inject = ['$location'];

    function FishThumbnail($location) {
        return {
            restrict: 'E',
            template: `
            <div class='panel panel-default wf-fish-thumbnail' ng-click='gotoFishDetail()'>
                <div class='wf-fish-icon-container'>
                    <img class='wf-fish-icon' ng-src='{{fish.url_picture}}' wf-loading>
                </div>
                <div>
                    <img ng-src='http://placehold.it/175x25/888/000&text={{fish.usual_name}}'>
                </div>
            </div>`,
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
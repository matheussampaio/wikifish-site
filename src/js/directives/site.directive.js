(function () {
    'use strict';

    angular
        .module('wfApp.new.directives')
        .directive('Site', Site);

    Site.$inject = ['MultiTransclude'];

    function Site(MultiTransclude) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: true,
            templateUrl: 'partials/wfSite',
            transclude: true
        };
        return directive;

        function link(scope, iElem, iAttrs, ctrl, transclude) {
            MultiTransclude.transclude(iElem, transclude);
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('wfApp.directives')
        .directive('wfLoading', Loading);

    function Loading() {
        return {
            restrict: 'A',
            link: (scope, elem) => {
                elem.parent().append('<i class="fa fa-circle-o-notch fa-spin fa-4x"></i>');
                elem.addClass('ng-hide');

                elem.on('load', () => {
                    elem.parent().find('i').remove();
                    elem.removeClass('ng-hide');
                });

                elem.on('error', () => {
                    console.log('Error loading image');
                    elem.parent().find('i').remove();
                    elem.parent().append('<i class="wf-loading-error-icon fa fa-picture-o fa-4x"></i>');
                });
            }
        };
    }

})();
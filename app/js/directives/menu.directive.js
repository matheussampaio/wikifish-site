(function () {
    'use strict';

    angular
        .module('wfApp.directives')
        .directive('wfMenu', Menu);

    Menu.$inject = ['$location'];

    function Menu($location) {
        return {
            template: `
            <nav>
                <ul>
                    <li ng-repeat='item in items'
                    ng-bind='item'
                    ng-class="{'wf-selected': item === selected}"
                    ng-click='selectItem(item)'>
                    </li>
                </ul>
            </nav>`,
            scope: {
                items: '=',
                selected: '='
            },
            link: (scope) => {
                scope.selectItem = (item) => {
                    scope.selected = item;
                    $location.path(item);
                };
            }
        };
    }

})();
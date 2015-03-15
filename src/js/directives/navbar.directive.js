(function () {
    'use strict';

    angular
        .module('wfApp.directives')
        .directive('wfNavbar', Navbar);

    function Navbar() {
        var directive = {
            controllerAs: 'vm',
            controller: NavbarController,
            restrict: 'E',
            scope: {
                user: '='
            },
            templateUrl: 'partials/wfNavbar'
        };
        return directive;
    }

    NavbarController.$inject = ['$location'];

    function NavbarController($location) {
        var vm = this;
        vm.items = getItems();
        vm.active = $location.path();

        ////////////////

        function getItems() {
            return [
                {title: 'Home', url: '/'}
            ];
        }
    }
})();
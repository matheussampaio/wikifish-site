(function () {
    'use strict';

    angular
        .module('wfSearchInput', [])
        .directive('wfSearchInput', wfSearchInput);

    function wfSearchInput() {
        var directive = {
            controllerAs: 'vm',
            controller: SearchInputController,
            link: link,
            restrict: 'E',
            templateUrl: 'partials/wfSearch'
        };
        return directive;

        /////////////////

        function link(scope, element) {
            element.find('#search').focus();
        }
    }

    SearchInputController.$inject = ['$location'];

    /* @ngInject */
    function SearchInputController($location) {
        var vm = this;
        vm.options = getOptions();
        vm.submit = submitSearch;
        vm.search = '';

        ////////////////

        function submitSearch() {
            $location.path('/search');
            $location.search(escapeOptions());
        }

        function escapeOptions() {
            var query = {};

            vm.options.forEach((option) => {
                query[option.name] = convertArray(option.values);
            });

            query['usual_name__regex'] = vm.search.toLowerCase();

            return query;
        }

        function convertArray(array) {
            return array.filter(function (item) {
                return item.value;
            }).map(function (item) {
                return item.enum;
            }).join(',');
        }

        function getOptions() {
            var options = [
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

            return options;
        }
    }
})();
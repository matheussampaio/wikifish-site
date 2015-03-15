(function () {
    'use strict';

    angular
        .module('wfApp.directives')
        .directive('wfSearchInput', wfSearchInput);

    function wfSearchInput() {
        var directive = {
            controllerAs: 'vm',
            controller: SearchInputController,
            link: link,
            restrict: 'E',
            scope: {},
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
                },
                {
                    name: '"aquarium_setup__in',
                    title: 'Configuração do Aquário',
                    values: [
                        {title: 'Aquário com plantas densas', enum: 'DENSELY_PLANTED', value: true},
                        {title: 'Pedras; Sem plantas', enum: 'ONLY_ROCKS', value: true},
                        {title: 'Só cascalho no fundo', enum: 'GRAVEL_BOTTOM', value: true},
                        {title: 'Pedras, Plantas e Madeiras', enum: 'ROCKS_PLANTS_DRIFTWOOD', value: true}
                    ]
                },
                {
                    name: 'swimming__in',
                    title: 'Hábitos de Natação',
                    values: [
                        {title: 'Baixo', enum: 'BOTTOM', value: true},
                        {title: 'Cima', enum: 'TOP', value: true},
                        {title: 'Meio', enum: 'MIDDLE', value: true},
                        {title: 'Nada em especial', enum: 'NONE', value: true}
                    ]
                },
                {
                    name: 'light__in',
                    title: 'Iluminação do Aquário',
                    values: [
                        {title: 'Claro. Com luz do Sol', enum: 'BRIGHT_WITH_SUNLIGHT', value: true},
                        {title: 'Claro. Nenhuma luz do Sol', enum: 'BRIGHT_NO_SUNLIGHT', value: true},
                        {title: 'Mais escuro possível', enum: 'DARK', value: true}
                    ]
                },
                {
                    name: 'temperament__in',
                    title: 'Temperamento',
                    values: [
                        {title: 'Pacífico', enum: 'PEACEFUL', value: true},
                        {title: 'Perigoso', enum: 'DANGER', value: true}
                    ]
                }
            ];

            return options;
        }
    }
})();
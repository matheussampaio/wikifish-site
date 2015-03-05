'use strict';

/* Directives */

var wfApp = angular.module('wfApp.directives', []);

wfApp.directive('wfSite', function (MultiTransclude) {
    return {
        scope: {},
        transclude: true,
        template:
            "<div>" +
                "<header transclude-id='site-head'></header>" +
                "<nav transclude-id='site-menu'></nav>" +
                "<main transclude-id='site-body'></main>" +
                "<wf-footer></wf-footer>" +
            "</div>",
        link: function (scope, iElem, iAttrs, ctrl, transclude) {
            MultiTransclude.transclude(iElem, transclude);
        }
    };
});

wfApp.directive('wfNavbar', function ($location) {
    return {
        scope: {},
        templateUrl: 'partials/wfNavbar',
        link: function (scope, iElem, iAttrs) {
            scope.items = [
                {title: 'Home', url: '#/'}
            ];

            var lPath = $location.path();

            scope.items.forEach(function(item) {
                if (item.url === lPath) {
                    scope.active = item.title;
                }
            })

        }
    };
});

wfApp.directive('wfList', function () {
    return {
        template:
            "<ul>" +
                "<li ng-repeat='item in items' " +
                "ng-bind='item' " +
                "ng-class=\"{'wf-selected': item === selected}\" " +
                "ng-click='selectItem(item)' >" +
                "</li>" +
            "</ul>",
        scope: {
            items: "=",
            selected: "="
        },
        link: function (scope, elem, attrs) {
            scope.selectItem = function (item) {
                scope.selected = item;
            }
        }
    };
});

wfApp.directive('wfMenu', function ($location) {
    return {
        template:
            "<nav>" +
                "<ul>" +
                    "<li ng-repeat='item in items' " +
                    "ng-bind='item' " +
                    "ng-class=\"{'wf-selected': item === selected}\" " +
                    "ng-click='selectItem(item)' >" +
                    "</li>" +
                "</ul>" +
            "</nav>",
        scope: {
            items: "=",
            selected: "="
        },
        link: function (scope, elem, attrs) {
            scope.selectItem = function (item) {
                scope.selected = item;
                $location.path(item);
            }
        }
    };
});

wfApp.directive('wfSearch', function ($location) {
    return {
        restrict: 'E',
        template:
            "<form class='form-horizontal' role='form' name='searchFish' >" +
                "<div class='form-group'>" +
                    "<input class='form-control' type='text' ng-model='wf_search_term'/>" +
                "</div>" +
                "<div class='form-group'>" +
                    "<div class='text-center'>" +
                        "<button class='btn btn-default' ng-click='submit()' ng-bind='button_text' />" +
                    "</div>" +
                "</div>" +
            "</form>",
        scope: {
            button_text: "@buttontext"
        },
        link: function (scope, elem, attrs) {
            scope.submit = function () {
                $location.path('/search/' + encodeURIComponent(scope.wf_search_term));
            }

            elem.find('input').focus();
        }
    };
});

wfApp.directive('wfFishThumbnail', function ($location) {
    return {
        restrict: 'E',
        template:
            '<div class="wf-fish-thumbnail" ng-click="gotoFishDetail()">' +
                '<img ng-src="http://placehold.it/175x175&text={{fish.usual_name}}" wf-spinner-on-load>' +
                '<div>' +
                    '<img ng-src="http://placehold.it/175x25/888/000&text={{fish.usual_name}}">' +
                '</div>' +
            '</div>',
        scope: {
            fish: '=fish'
        },
        link: function (scope, elem, attrs) {
            scope.gotoFishDetail = function() {
                $location.path("/fish/" + scope.fish._id);
            }
        }
    }
});

wfApp.directive('wfFishDetail', function ($location) {
    return {
        restrict: 'E',
        template:
            '<div class="wf-fish-detail">' +
                '<img class="wf-fish-icon" ng-src="http://placehold.it/400x400&text={{data.fish.usual_name}}" wf-spinner-on-load>' +
                '<div class="wf-fish-infos">' +
                    '<p ng-show="data.fish.usual_name">Nome Usual: {{data.fish.usual_name | ucfirst}}</p>' +
                    '<p ng-show="data.fish.cientific_name">Nome Cientifico: {{data.fish.cientific_name | ucfirst}}</p>' +
                    '<p ng-show="data.fish.ph">PH: {{data.fish.ph}}</p>' +
                    '<p ng-show="data.fish.dh">DH: {{data.fish.dh}}</p>' +
                    '<p ng-show="data.fish.temperature">Temperatura: {{data.fish.dh}}</p>' +
                    '<p ng-show="data.fish.maximum_length">Tamanho Máximo: {{data.fish.maximum_length}}cm</p>' +
                    '<p ng-show="data.fish.aquarium_liters">Tamanho Aquario: {{data.fish.aquarium_liters}} L</p>' +
                    '<p ng-show="data.fish.aquarium_setup">Configuração do Aquario: {{data.fish.aquarium_setup}}</p>' +
                    '<p ng-show="data.fish.alimentation">Alimentação: {{data.fish.alimentation}}</p>' +
                    '<p ng-show="data.fish.reproduction">Reprodução: {{data.fish.reproduction}}</p>' +
                    '<p ng-show="data.fish.temperament">Temperamento: {{data.fish.temperament}}</p>' +
                    '<p ng-show="data.fish.swimming">Swimming: {{data.fish.swimming}}</p>' +
                    '<p ng-show="data.fish.region">Região: {{data.fish.region}}</p>' +
                '</div>' +
            '</div>',
        scope: true,
        link: function (scope, elem, attrs) {
        }
    }
});

wfApp.directive('wfBigLogo', function () {
    return {
        template: '<h1 class="wf-big-logo text-center">WikiFish</h1>'
    }
});

wfApp.directive('wfFooter', function () {
    return {
        template:
            "<footer>" +
            "</footer>"
    };
});

wfApp.directive('wfSpinnerOnLoad', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            console.log('load finish');
        }
    }
});
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
                {title: 'Home', url: '/'}
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
                    "<input class='form-control' type='text' ng-model='wf_search_term' placeholder='Pesquisar por peixes' />" +
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
                $location.path('search/' + encodeURIComponent(scope.wf_search_term));
            }
        }
    };
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
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
                "<footer></footer>" +
            "</div>",
        link: function (scope, iElem, iAttrs, ctrl, transclude) {
            MultiTransclude.transclude(iElem, transclude);
        }
    };
});

wfApp.directive('wfList', function () {
    return {
        template:
            "<ul>" +
                "<li ng-repeat='item in items' " +
                "ng-bing='item' " +
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
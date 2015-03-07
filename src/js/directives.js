'use strict';

/* Directives */

var wfApp = angular.module('wfApp.directives', []);

wfApp.directive('wfSite', (MultiTransclude) => {
    return {
        scope: {},
        transclude: true,
        template: `
            <div>
                <header transclude-id='site-head'></header>
                <nav transclude-id='site-menu'></nav>
                <main transclude-id='site-body'></main>
                <wf-footer></wf-footer>
            </div>`,
        link: (scope, iElem, iAttrs, ctrl, transclude) => {
            MultiTransclude.transclude(iElem, transclude);
        }
    };
});

wfApp.directive('wfNavbar', ($location) => {
    return {
        scope: true,
        templateUrl: 'partials/wfNavbar',
        link: (scope) => {
            scope.items = [
                {title: 'Home', url: '/'}
            ];

            scope.active = $location.path();
        }
    };
});

wfApp.directive('wfMenu', ($location) =>{
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
            }
        }
    };
});

wfApp.directive('wfSearch', ($location) => {
    return {
        restrict: 'E',
        template: `
            <form class='form-horizontal' role='form' name='searchFish' >
                <div class='form-group'>
                    <input class='form-control' type='text' ng-model='wf_search_term'/>
                </div>
                <div class='form-group'>
                    <div class='text-center'>
                        <button class='btn btn-default' ng-click='submit()' ng-bind='button_text' />
                    </div>
                </div>
            </form>`,
        scope: {
            button_text: '@buttontext'
        },
        link: (scope, elem) => {
            scope.submit = () => {
                $location.path('/search/' + encodeURIComponent(scope.wf_search_term));
            }

            elem.find('input').focus();
        }
    };
});

wfApp.directive('wfFishThumbnail', ($location) => {
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
            }
        }
    }
});

wfApp.directive('wfFishDetail', () => {
    return {
        restrict: 'E',
        templateUrl: 'partials/wfFishDetail',
        scope: true
    }
});

wfApp.directive('wfBigLogo', () => {
    return {
        template: '<h1 class="wf-big-logo text-center">WikiFish</h1>'
    }
});

wfApp.directive('wfFooter', () => {
    return {
        template: '<footer></footer>'
    };
});

wfApp.directive('wfLoading', () => {
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
    }
});
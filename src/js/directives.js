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

wfApp.directive('wfMenu', ($location) => {
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

wfApp.directive('wfFishNewComment', (Comment, CommentsService) => {
    return {
        restrict: 'E',
        templateUrl: 'partials/wfFishNewComment',
        scope: {
            user: '=',
            fish: '='
        },
        link: (scope) => {
            scope.sendComment = () => {

                var newComment = {
                    parent: scope.fish._id,
                    text: scope.text,
                    user: scope.user.login,
                    likes: [scope.user.login]
                };

                CommentsService.saveComment(newComment).
                    then((data) => {
                        scope.text = '';
                    }, (error) => {
                        console.error('Houve algum error', data);
                    });

            };


            if (scope.user.authenticated) {
                scope.placeholder = 'Deixe um comentário...';
            } else {
                scope.placeholder = 'Faça o login para deixar um comentário.';
            }
        }
    }
});

wfApp.directive('wfComment', (CommentsService) => {
    return {
        restrict: 'E',
        templateUrl: 'partials/wfComment',
        scope: {
            comment: '=',
            user: '='
        },
        link: (scope, element) => {

            scope.data = {
                likes: scope.comment.likes.length,
                already_like: scope.comment.likes.indexOf(scope.user.login) !== -1
            };

            var btnLike = element.find('#like');

            btnLike.on('mouseenter', function() {
                scope.data.likes = '+1';
                scope.$apply();
            });

            btnLike.on('mouseleave', function() {
                scope.data.likes = scope.comment.likes.length;
                scope.$apply();
            });

            scope.likeComment = CommentsService.likeComment;
        }
    }
});
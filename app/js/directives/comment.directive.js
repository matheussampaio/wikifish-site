(function () {
    'use strict';

    angular
        .module('wfApp.directives')
        .directive('wfComment', CommentDirective);

    CommentDirective.$inject = ['Comment'];

    function CommentDirective() {
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
                    alreadyLike: scope.comment.likes.indexOf(scope.user.login) !== -1
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

                //scope.likeComment = CommentsService.likeComment;
            }
        };
    }

})();
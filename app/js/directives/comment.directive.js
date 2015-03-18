(function () {
    'use strict';

    angular
        .module('wfApp.directives')
        .directive('wfComment', CommentDirective);

    CommentDirective.$inject = ['Comment'];

    function CommentDirective(Comment) {
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
                    alreadyLike: scope.comment.likes.indexOf(scope.user.email) !== -1
                };

                var btnLike = element.find('#like');

                btnLike.on('mouseenter', function() {
                    if (!scope.alreadyLike) {
                        scope.data.likes = '+1';
                        scope.$apply();
                    }
                });

                btnLike.on('mouseleave', function() {
                    if (!scope.alreadyLike) {
                        scope.data.likes = scope.comment.likes.length;
                        scope.$apply();
                    }
                });

                scope.likeComment = (commentId, userEmail) => {
                    scope.alreadyLike = true;
                    Comment.likeComment(commentId, userEmail);
                };
            }
        };
    }

})();
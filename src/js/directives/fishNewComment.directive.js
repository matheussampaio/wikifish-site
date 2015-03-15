(function () {
    'use strict';

    angular
        .module('wfApp.directives')
        .directive('wfFishNewComment', FishNewComment);

    FishNewComment.$inject = ['Comment'];

    function FishNewComment(Comment) {
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

                    Comment.addComment(newComment)
                        .then((data) => {
                            scope.text = '';
                        });

                };

                if (scope.user.authenticated) {
                    scope.placeholder = 'Deixe um comentário...';
                } else {
                    scope.placeholder = 'Faça o login para deixar um comentário.';
                }
            }
        };
    }

})();
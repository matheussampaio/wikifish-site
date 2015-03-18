(function () {
    'use strict';

    angular
        .module('wfApp.services')
        .factory('Comment', CommentService);

    CommentService.$inject = ['$resource'];

    function CommentService($resource) {
        var service = {
            resource: getResource(),
            getCommentsByFishID: getCommentsByFishID,
            addComment: addComment,
            likeComment: likeComment,
            data: {
                comments: []
            }
        };

        return service;

        ////////////////

        function getResource() {
            return $resource('/api/comment/:id', {}, {
                fish: {
                    method: 'GET',
                    url: '/api/comment?parent=:fish',
                    isArray: true
                },
                get: {
                    isArray: true
                },
                like: {
                    method: 'GET',
                    url: '/api/comment/:id/like?user=:user'
                }
            });
        }

        function getCommentsByFishID(fishID) {
            service.resource.fish({'fish': fishID})
                .$promise
                .then(getCommentsByFishIDComplete)
                .catch(getCommentsByFishIDFailed);

            return service.data;

            function getCommentsByFishIDComplete(comments) {
                service.data.comments = comments;
            }

            function getCommentsByFishIDFailed(error) {
                console.error('Get comments by fish id failed.', error);
            }
        }

        function addComment(comment) {
            service.resource.save(comment)
                .$promise
                .then(addCommentComplete)
                .catch(addCommentFailed);

            return service.data;

            function addCommentComplete(comment) {
                service.data.comments.push(comment);
            }

            function addCommentFailed(error) {
                console.error('Add comment failed.', error);
            }
        }

        function likeComment(commentID, userLogin) {
            return service.resource.like({'id': commentID, 'user': userLogin})
                .$promise
                .then(likeCommentComplete)
                .catch(likeCommentFailed);

            function likeCommentComplete(comment) {
                for (var i in service.data.comments) {
                    if (service.data.comments[i]._id === comment._id) {
                        service.data.comments[i] = comment;
                    }
                }
                return comment;
            }

            function likeCommentFailed(error) {
                console.error('Like Comment failed.', error);
            }
        }

    }
})();


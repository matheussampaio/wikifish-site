(function () {
    'use strict';

    angular
        .module('wfApp.services')
        .factory('Comment', Comment);

    Comment.$inject = ['$resource'];

    function Comment($resource) {
        var service = {
            resource: getResource(),
            getCommentsByFishID: getCommentsByFishID,
            addComment: addComment,
            likeComment: likeComment
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
            return service.resource.fish({'fish': fishID})
                .$promise
                .then(getCommentsByFishIDComplete)
                .catch(getCommentsByFishIDFailed);

            function getCommentsByFishIDComplete(response) {
                return response;
            }

            function getCommentsByFishIDFailed(error) {
                console.error('Get comments by fish id failed.', error);
            }
        }

        function addComment(comment) {
            return service.resource.save(comment)
                .$promise
                .then(addCommentComplete)
                .catch(addCommentFailed);

            function addCommentComplete(response) {
                return response;
            }

            function addCommentFailed(error) {
                console.error('Add comment failed.', error);
            }
        }

        function likeComment(commentID, userLogin) {
            return service.resource.lile({'id': commentID, 'user': userLogin})
                .then(likeCommentComplete)
                .catch(likeCommentFailed);

            function likeCommentComplete(response) {
                //for (var i in commentsService.comments) {
                //    if (commentsService.comments[i]._id === comment._id) {
                //        commentsService.comments[i] = comment;
                //    }
                //}
                return response;
            }

            function likeCommentFailed(error) {
                console.error('Like Comment failed.', error);
            }
        }

    }
})();


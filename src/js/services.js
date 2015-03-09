'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var wfApp = angular.module('wfApp.services', ['ngResource']);


wfApp.factory("Fish", ($resource) => {
    return $resource('/api/fish/:id', {}, {
        search: {
            method: 'GET',
            url : '/api/fish/search/:term',
            isArray: true
        },
        get: {
            isArray: true
        }
    });
});

wfApp.factory("Comment", ($resource) => {
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
});

wfApp.factory("CommentsService", (Comment) => {
    var commentsService = { data: [] };

    commentsService.requestComments = (fishid) => {
        Comment.get({'fish': fishid}, (comments) => {
            commentsService.data = comments;
        });

        return commentsService;
    };

    commentsService.pushComment = (comment) => {
        commentsService.data.push(comment);
    };

    commentsService.saveComment = (newComment) => {
        return Comment.save(newComment).$promise.
            then((data) => {
                commentsService.pushComment(data);
                return data;
            }, (error) => {
                return error;
            } );
    };

    commentsService.likeComment = (commentid, user) => {
        Comment.like({'id': commentid, 'user': user}, (comment) => {
            for (var i in commentsService.data) {
                if (commentsService.data[i]._id === comment._id) {
                    commentsService.data[i] = comment;
                }
            }
        });
    };

    return commentsService;
});

wfApp.factory('FishService', (Fish) => {
    var fishService = { data: [] };

    fishService.requestFish = (fishid) => {
        Fish.get({'id':  fishid}, (fish) => {
            fishService.data = fish[0];
        });

        return fishService;
    };

    return fishService;
});
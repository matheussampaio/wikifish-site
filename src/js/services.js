'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var wfApp = angular.module('wfApp.services', ['ngResource']);


wfApp.factory("Fish", ($resource) => {
    return $resource('/api/fish/:id', {}, {
        search: {
            method: 'GET',
            url : '/api/fish/search?term=:term',
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
    var commentsService = {};

    commentsService.requestComments = (fishid) => {
        Comment.fish({'fish': fishid}, (comments) => {
            commentsService.comments = comments;
        });

        return commentsService;
    };

    commentsService.pushComment = (comment) => {
        if (!commentsService.comments) {
            commentsService.comments = [];
        }

        commentsService.comments.push(comment);
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
            for (var i in commentsService.comments) {
                if (commentsService.comments[i]._id === comment._id) {
                    commentsService.comments[i] = comment;
                }
            }
        });
    };

    return commentsService;
});

wfApp.factory('FishService', (Fish) => {
    var fishService = {};

    fishService.requestFish = (fishid) => {
        Fish.get({'id':  fishid}, (fish) => {
            fishService.fish = fish;
        });

        return fishService;
    };

    fishService.searchFish = (term) => {
        Fish.search({'term': term}, (fishs) => {
            fishService.fishs = fishs;
        });

        return fishService;
    };

    return fishService;
});
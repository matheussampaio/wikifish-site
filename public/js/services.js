"use strict";

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var wfApp = angular.module("wfApp.services", ["ngResource"]);

wfApp.factory("Fish", function ($resource) {
    return $resource("/api/fish/:id", {}, {
        search: {
            method: "GET",
            url: "/api/fish/search?term=:term",
            isArray: true
        }
    });
});

wfApp.factory("Comment", function ($resource) {
    return $resource("/api/comment/:id", {}, {
        fish: {
            method: "GET",
            url: "/api/comment?parent=:fish",
            isArray: true
        },
        get: {
            isArray: true
        },
        like: {
            method: "GET",
            url: "/api/comment/:id/like?user=:user"
        }
    });
});

wfApp.factory("CommentsService", function (Comment) {
    var commentsService = {};

    commentsService.requestComments = function (fishid) {
        Comment.fish({ fish: fishid }, function (comments) {
            commentsService.comments = comments;
        });

        return commentsService;
    };

    commentsService.pushComment = function (comment) {
        if (!commentsService.comments) {
            commentsService.comments = [];
        }

        commentsService.comments.push(comment);
    };

    commentsService.saveComment = function (newComment) {
        return Comment.save(newComment).$promise.then(function (data) {
            commentsService.pushComment(data);
            return data;
        }, function (error) {
            return error;
        });
    };

    commentsService.likeComment = function (commentid, user) {
        Comment.like({ id: commentid, user: user }, function (comment) {
            for (var i in commentsService.comments) {
                if (commentsService.comments[i]._id === comment._id) {
                    commentsService.comments[i] = comment;
                }
            }
        });
    };

    return commentsService;
});

wfApp.factory("FishService", function (Fish) {
    var fishService = {};

    fishService.requestFish = function (fishid) {
        Fish.get({ id: fishid }, function (fish) {
            fishService.fish = fish;
        });

        return fishService;
    };

    fishService.searchFish = function (term) {
        Fish.search({ term: term }, function (fishs) {
            fishService.fishs = fishs;
        });

        return fishService;
    };

    return fishService;
});
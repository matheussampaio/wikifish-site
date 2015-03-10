"use strict";

/* Directives */

var wfApp = angular.module("wfApp.directives", []);

wfApp.directive("wfSite", function (MultiTransclude) {
    return {
        scope: {},
        transclude: true,
        template: "\n            <div>\n                <header transclude-id='site-head'></header>\n                <nav transclude-id='site-menu'></nav>\n                <main transclude-id='site-body'></main>\n                <wf-footer></wf-footer>\n            </div>",
        link: function (scope, iElem, iAttrs, ctrl, transclude) {
            MultiTransclude.transclude(iElem, transclude);
        }
    };
});

wfApp.directive("wfNavbar", function ($location) {
    return {
        scope: true,
        templateUrl: "partials/wfNavbar",
        link: function (scope) {
            scope.items = [{ title: "Home", url: "/" }];

            scope.active = $location.path();
        }
    };
});

wfApp.directive("wfMenu", function ($location) {
    return {
        template: "\n            <nav>\n                <ul>\n                    <li ng-repeat='item in items'\n                    ng-bind='item'\n                    ng-class=\"{'wf-selected': item === selected}\"\n                    ng-click='selectItem(item)'>\n                    </li>\n                </ul>\n            </nav>",
        scope: {
            items: "=",
            selected: "="
        },
        link: function (scope) {
            scope.selectItem = function (item) {
                scope.selected = item;
                $location.path(item);
            };
        }
    };
});

var talim;
wfApp.directive("wfSearch", function ($location) {
    return {
        restrict: "E",
        templateUrl: "partials/wfSearch",
        scope: {
            button_text: "@buttontext",
            options: "="
        },
        link: function (scope, elem) {
            elem.find("#search").focus();

            scope.submit = function () {
                $location.path("/search");

                var query = escapeOptions();

                console.log(query);

                $location.search(query);
            };

            var escapeOptions = function () {
                var query = {};

                scope.options.forEach(function (option) {
                    query[option.name] = convertArray(option.values);
                });

                query.usual_name__regex = scope.wf_search_term;

                return query;
            };

            var convertArray = function (array) {
                return array.filter(function (item) {
                    return item.value;
                }).map(function (item) {
                    return item["enum"];
                }).join(",");
            };
        }

    };
});

wfApp.directive("wfFishThumbnail", function ($location) {
    return {
        restrict: "E",
        template: "\n            <div class='panel panel-default wf-fish-thumbnail' ng-click='gotoFishDetail()'>\n                <div class='wf-fish-icon-container'>\n                    <img class='wf-fish-icon' ng-src='{{fish.url_picture}}' wf-loading>\n                </div>\n                <div>\n                    <img ng-src='http://placehold.it/175x25/888/000&text={{fish.usual_name}}'>\n                </div>\n            </div>",
        scope: {
            fish: "=fish"
        },
        link: function (scope) {
            scope.gotoFishDetail = function () {
                $location.path("/fish/" + scope.fish._id);
            };
        }
    };
});

wfApp.directive("wfBigLogo", function () {
    return {
        template: "<h1 class=\"wf-big-logo text-center\">WikiFish</h1>"
    };
});

wfApp.directive("wfFooter", function () {
    return {
        template: "<footer></footer>"
    };
});

wfApp.directive("wfLoading", function () {
    return {
        restrict: "A",
        link: function (scope, elem) {
            elem.parent().append("<i class=\"fa fa-circle-o-notch fa-spin fa-4x\"></i>");
            elem.addClass("ng-hide");

            elem.on("load", function () {
                elem.parent().find("i").remove();
                elem.removeClass("ng-hide");
            });

            elem.on("error", function () {
                console.log("Error loading image");
                elem.parent().find("i").remove();
                elem.parent().append("<i class=\"wf-loading-error-icon fa fa-picture-o fa-4x\"></i>");
            });
        }
    };
});

wfApp.directive("wfFishNewComment", function (Comment, CommentsService) {
    return {
        restrict: "E",
        templateUrl: "partials/wfFishNewComment",
        scope: {
            user: "=",
            fish: "="
        },
        link: function (scope) {
            scope.sendComment = function () {

                var newComment = {
                    parent: scope.fish._id,
                    text: scope.text,
                    user: scope.user.login,
                    likes: [scope.user.login]
                };

                CommentsService.saveComment(newComment).then(function (data) {
                    scope.text = "";
                }, function (error) {
                    console.error("Houve algum error", data);
                });
            };

            if (scope.user.authenticated) {
                scope.placeholder = "Deixe um comentário...";
            } else {
                scope.placeholder = "Faça o login para deixar um comentário.";
            }
        }
    };
});

wfApp.directive("wfComment", function (CommentsService) {
    return {
        restrict: "E",
        templateUrl: "partials/wfComment",
        scope: {
            comment: "=",
            user: "="
        },
        link: function (scope, element) {

            scope.data = {
                likes: scope.comment.likes.length,
                already_like: scope.comment.likes.indexOf(scope.user.login) !== -1
            };

            var btnLike = element.find("#like");

            btnLike.on("mouseenter", function () {
                scope.data.likes = "+1";
                scope.$apply();
            });

            btnLike.on("mouseleave", function () {
                scope.data.likes = scope.comment.likes.length;
                scope.$apply();
            });

            scope.likeComment = CommentsService.likeComment;
        }
    };
});
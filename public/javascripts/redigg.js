var app = angular.module('Redigg', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        })
        .when('/viewcomments/:articleid', {
            templateUrl: 'partials/article.html',
            controller: 'articleCtrl'
        })
        .when('/comment/:articleid/:commentid', {
            templateUrl: 'partials/edit.html',
            controller: 'editCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('homeCtrl', ['$scope', '$resource',
    function($scope, $resource){
    	var articles = $resource('/api/articles');
    	articles.query(function(articles){
    		$scope.articles = articles;
    	});
	}
]);

app.controller('editCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var articles = $resource('/api/articles/:articleid', {articleid: $routeParams.articleid}, {update: {method: 'PUT'}});
        var comment = $resource('/api/articles/:articleid/:commentid', {articleid:$routeParams.articleid}, {commentid:$routeParams.commentid});

        articles.get(function(article){
            $scope.article = article;
            $scope.comment = article.comments[$routeParams.commentid];
        });

        //Remove the old and create a new. This must be named differently than the other controller's submit.
        $scope.turnIn = function(){
            comment.delete({ articleid: $routeParams.articleid, commentid: $routeParams.commentid }, function(article) {
                $scope.newComment.votes = $scope.comment.votes;
                comment.save($scope.newComment, function(){
                    $location.path('/viewcomments/' + $routeParams.articleid, {articleid:'@_id'});
                });
            });
        };
    }
]);

app.controller('articleCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var articles = $resource('/api/articles/:articleid', {articleid: "@_id"}, {update: {method: 'PUT'}});

        articles.get({articleid: $routeParams.articleid}, function(article){
            $scope.article = article;
            $scope.comments = article.comments;
        });

        //"refresh" the page when a change occurs
        $scope.updatePage = function () {
            articles = $resource('/api/articles/:articleid', {articleid: "@_id"}, {update: {method: 'PUT'}});
            articles.get({articleid: $routeParams.articleid}, function(article){
                $scope.article = article;
            });
        };

        // this must be done due to the other post method that does not use :articleid
        $scope.submit = function(){
            $scope.article.user = $scope.newComment.user;
            $scope.article.body = $scope.newComment.body;
            $scope.article.date = $scope.newComment.date;
            articles.save($scope.article, function(){
               $scope.updatePage();
            });
        };

        $scope.upvoteArticle = function(){
            $scope.article.vote = true;
            articles.update($scope.article, function(article){
                $scope.updatePage();
            });
        };

        $scope.downvoteArticle = function(){
            $scope.article.vote = false;
            articles.update($scope.article, function(article){
                $scope.updatePage();
            });
        };

        $scope.upvoteComment = function(id){
            var comment = $resource('/api/articles/:articleid/:commentid', {articleid: "@_id", commentid: "@commentid"}, {update: {method: 'PUT'}});
            $scope.article.commentid = id;
            $scope.article.vote = true;
            comment.update($scope.article, function(article){
                $scope.updatePage();
            });
        };

        $scope.downvoteComment = function(id){
            var comment = $resource('/api/articles/:articleid/:commentid', {articleid: "@_id", commentid: "@commentid"}, {update: {method: 'PUT'}});
            $scope.article.commentid = id;
            $scope.article.vote = false;
            comment.update($scope.article, function(article){
                $scope.updatePage();
            });
        };

        $scope.delete = function(id){
            var comment = $resource('/api/articles/:articleid/:commentid', {articleid: "@_id", commentid: "@commentid"}, {update: {method: 'PUT'}});
            comment.delete({articleid: $routeParams.articleid, commentid: id}, function(article) {
                $scope.updatePage();
            });
        }

        $scope.edit = function(id){
            console.log('/comment/' + $routeParams.articleid + "/" + id);
            $location.path('/comment/' + $routeParams.articleid + "/" + id);
        }
    }
]);

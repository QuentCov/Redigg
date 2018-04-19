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
        .when('/comment/:articleid/:commentid') {
            templateUrl: 'partials/edit.html',
            controller: 'editCtrl'
        }
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
    function($scope, $resource){
        var articles = $resource('/api/articles/:articleid', {articleid:'@_id'}, {update: {method: 'PUT'}});
        var comments = $resource('/api/articles/:articleid/:commentid', {articleid:'@_id'}, {commentid:'@commentid'});

        articles.query(function(article){
            $scope.article = article;
        });

        comment.query(function(comment){
            $scope.comment = comment;
        });

        //Remove the old and create a new.
        $scope.submit = function(){
            comments.delete({ articleid: $routeParams.articleid, commentid: $routeParams.comment.commentid }, function(article) {
                articles.save($scope.comment, function(){
                    $location.path('/viewcomments/:articleid', {articleid:'@_id'});
                });
            }
        };
    }
]);

app.controller('articleCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var articles = $resource('/api/articles/:articleid', {articleid:'@_id'}, {update: {method: 'PUT'}});
        var comments = $resource('/api/articles/:articleid/:commentid', {articleid:'@_id'}, {commentid:'@commentid'}, {update: {method: 'PUT'}});

        articles.query(function(article){
            $scope.article = article;
        });

        comments.query(function(comments){
            $scope.comments = comments;
        });

        $scope.submit = function(){
            articles.save($scope.comment, function(){
                $location.path('/viewcomments/:articleid', {articleid:'@_id'});
            });
        };

        $scope.upvoteArticle = function(){
            $scope.articles.vote = true;
            articles.update($scope.articles, function(article){
                $location.path('/viewcomments/:articleid', {articleid:'@_id'});
            });
        };

        $scope.downvoteArticle = function(){
            $scope.articles.vote = false;
            articles.update($scope.articles, function(article){
                $location.path('/viewcomments/:articleid', {articleid:'@_id'});
            });
        };

        $scope.upvoteComment = function(){
            $scope.comment.vote = false;
            comments.update($scope.comment, function(article){
                $location.path('/viewcomments/:articleid', {articleid:'@_id'});
            });
        };

        $scope.downvoteComment = function(){
            $scope.comment.vote = false;
            comments.update($scope.comment, function(article){
                $location.path('/viewcomments/:articleid', {articleid:'@_id'});
            });
        };

        $scope.delete = function(){
            comments.delete({ articleid: $routeParams.articleid, commentid: $routeParams.comment.commentid }, function(article) {
                $location.path('/viewcomments/:articleid', {articleid:'@_id'});
            }
        }
    }
]);

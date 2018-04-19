var app = angular.module('Redigg', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        })
        .when('/add-article', {
            templateUrl: 'partials/addArticle.html',
            controller: 'addArticleCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('homeCtrl', ['$scope', '$resource', '$route',
    function($scope, $resource, $route){
    	var articles = $resource('/api/articles');
    	articles.query(function(articles){
    		$scope.articles = articles;
    	});

        $scope.delete = function(id){
            var article = $resource('/api/articles/' + id);
            article.delete({}, function(){
                $route.reload();
            })
        }
	}
]);

app.controller('addArticleCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
        	var articles = $resource('/api/articles');
        	articles.save($scope.article, function(){
        		$location.path('/');
        	});
        }
	}
]);

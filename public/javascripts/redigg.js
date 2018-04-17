var app = angular.module('Redigg', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
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
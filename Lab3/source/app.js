	var socialLoginApp = angular.module('socialLoginApp', ['ngRoute', 'ngAnimate']);

    socialLoginApp.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'login.html',
				controller: 'loginController'
			})
			.when('/login', {
				templateUrl: 'login.html',
				controller: 'loginController'
			})
			.when('/home', {
				templateUrl: 'home.html',
				controller: 'homeController'
			})
			.when('/contact', {
				templateUrl: 'contact.html',
				controller: 'contactController'
			});

	});

	socialLoginApp.controller('loginController', function($scope,$http) {
		$scope.pageClass = 'login';
		$scope.facebookLogin = function () {
			//alert("Hello");
            Login();
        }
	});

    socialLoginApp.controller('homeController', function($scope,$http) {
        $scope.pageClass = 'home';
        $scope.searchYahooNews = function () {
            alert("Helloyahoo1");
            searchYahoo('latest');
        }
    });

	socialLoginApp.controller('contactController', function($scope) {
		$scope.pageClass = 'contact';
	});



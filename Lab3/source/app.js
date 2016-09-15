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

	});

	socialLoginApp.controller('loginController', function($scope,$http) {
		$scope.pageClass = 'login';
		$scope.facebookLogin = function () {
			Login();
        }
	});
	angular.module('TopNews', [])
		.controller('homeController', function ($scope,$http) {

			$scope.searchTopNews = function () {

				$scope.newsList = new Array();
				$scope.sentimentType=new String();

				var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
				url += '?' + $.param({
						'api-key': "a5a334cacf4748dda9c62ae2837e51e0"
					});

				var handler = $http.get(url);
				handler.success(function (data1) {

					if (data1 != null) {
						if (data1.results != null) {
							console.log("Inside start loop ");
							// for (var i = 0; i < data1.results.length; i++) {
							for (var i = 0; i < 10; i++) {
								console.log("Inside loop" + i);
								var apiKey = "176a4b5ac100cfd63258185b6535e28dc9385fde";
								//This is the API call being made to get the sentiments.
								var url = "https://watson-api-explorer.mybluemix.net/alchemy-api/calls/url/URLGetTextSentiment?apikey=" +
									apiKey + "&url=" + data1.results[i].url + "&outputMode=json";

								var handler1 = $http.get(url);
								handler1.success(function (result) {
									console.log("doing API call 1");
									console.log(result);
									if (result != null) {
										console.log("doing API call");
										console.log(result.docSentiment.type);
										sentimentType = result.docSentiment.type;
									}
								})
								console.log(sentimentType);
								$scope.newsList[i] = {

									"abstract": data1.results[i].abstract,
									"section": data1.results[i].section,
									"title": data1.results[i].title,
									"url": data1.results[i].url,
									"sentiment": sentimentType
								};
							}
						}
					}

				})
				handler.error(function (data) {
					alert("There was some error processing your request. Please try after some time.");
				});

			}
		});
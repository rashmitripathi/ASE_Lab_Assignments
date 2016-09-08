var mapRashmiApp = angular.module('mapRashmiApp', ['ngRoute', 'ngAnimate']);

mapRashmiApp.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'welcome.html',
            controller: 'welcomeController'
    	})
    	.when('/register', {
    		templateUrl: 'register.html',
            controller: 'registerController'
    	})
    	.when('/login', {
    		templateUrl: 'login.html',
            controller: 'loginController'
    	})
		.when('/home', {
			templateUrl: 'home.html',
			controller: 'mainController'
		})

		.otherwise({ redirectTo: '/login' });


});

mapRashmiApp.controller('mainController', function($scope) {
    $scope.pageClass = 'home';
});

//mapRashmiApp.controller('loginController', function($scope,$http) {

mapRashmiApp.controller('loginController',function($scope,$http) {
    $scope.pageClass = 'login';

	$scope.login=function (userName,pwd) {
		//localStorage.setItem("name" , user);
		//$scope.logins.push( localStorage.getItem("name") + " was logged in.");
		if(userName=="rashmitripathi18@gmail.com" && pwd=="1234"){
						window.location.replace("home.html");
		}
		else {
			window.alert("Login Failed");
		}
		// $http.get("home.html")
		//	.then(function(response) {
		//		console.log(" Getting HTMl");
	//	$scope.userName = response.userName;
		//})

//		$http.get("home.html")
//			.success(function(response) {
		//		console.log(" Getting HTMl");
		//		$scope.userName = response.userName;
		//	});

	}
});

mapRashmiApp.controller('registerController', function($scope) {
    $scope.pageClass = 'register';
});

mapRashmiApp.controller('welcomeController', function($scope) {
	$scope.pageClass = 'welcome';
});


/*welcome  page js*/

(function($) {
	"use strict"; // Start of use strict

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: ($($anchor.attr('href')).offset().top - 50)
		}, 1250, 'easeInOutExpo');
		event.preventDefault();
	});

	// Highlight the top nav as scrolling occurs
	$('body').scrollspy({
		target: '.navbar-fixed-top',
		offset: 100
	});

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function() {
		$('.navbar-toggle:visible').click();
	});

	// Offset for Main Navigation
	$('#mainNav').affix({
		offset: {
			top: 50
		}
	})

})(jQuery); // End of use strict

//register page js

$(function () {
	$('.button-checkbox').each(function () {

		// Settings
		var $widget = $(this),
			$button = $widget.find('button'),
			$checkbox = $widget.find('input:checkbox'),
			color = $button.data('color'),
			settings = {
				on: {
					icon: 'glyphicon glyphicon-check'
				},
				off: {
					icon: 'glyphicon glyphicon-unchecked'
				}
			};

		// Event Handlers
		$button.on('click', function () {
			$checkbox.prop('checked', !$checkbox.is(':checked'));
			$checkbox.triggerHandler('change');
			updateDisplay();
		});
		$checkbox.on('change', function () {
			updateDisplay();
		});

		// Actions
		function updateDisplay() {
			var isChecked = $checkbox.is(':checked');

			// Set the button's state
			$button.data('state', (isChecked) ? "on" : "off");

			// Set the button's icon
			$button.find('.state-icon')
				.removeClass()
				.addClass('state-icon ' + settings[$button.data('state')].icon);

			// Update the button's color
			if (isChecked) {
				$button
					.removeClass('btn-default')
					.addClass('btn-' + color + ' active');
			}
			else {
				$button
					.removeClass('btn-' + color + ' active')
					.addClass('btn-default');
			}
		}

		// Initialization
		function init() {

			updateDisplay();

			// Inject the icon if applicable
			if ($button.find('.state-icon').length == 0) {
				$button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
			}
		}
		init();
	});
});








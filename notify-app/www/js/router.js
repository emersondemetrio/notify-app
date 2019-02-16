
notifyApp
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('index', {
			url: '/index',
			templateUrl: '/templates/index.html',
			controller: 'IndexCtrl'
		});

		$stateProvider.state('notifications', {
			url: '/notifications',
			templateUrl: '/templates/notifications.html',
			controller: 'NotificationsCtrl'
		});


		$stateProvider.state('user', {
			url: '/user',
			templateUrl: '/templates/user.html',
			controller: 'UserCtrl'
		});

		$urlRouterProvider.otherwise('/index');
	});
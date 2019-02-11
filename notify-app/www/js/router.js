
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

		$urlRouterProvider.otherwise('/index');
	});
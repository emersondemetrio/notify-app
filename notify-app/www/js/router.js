
notifyApp
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('index', {
			url: '/index',
			templateUrl: '/templates/index.html',
			controller: 'IndexCtrl'
		});

		$urlRouterProvider.otherwise('/index');
	});
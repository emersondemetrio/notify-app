const notifyApp = angular.module('NotificationsApp', [
	'ngAnimate',
	'ngSanitize',
	'ngCordova',
	'ionic'
]);

notifyApp
	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.Keyboard) {
				window.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});

notifyApp
	.constant('APP_STORAGE_KEY', 'youper-test-notifications')
	.constant('REMOTE_NOTIFICATIONS_URL', 'https://fathomless-mesa-23619.herokuapp.com')
	.constant('REMOTE_UPLOAD_URL', 'https://fathomless-mesa-23619.herokuapp.com/api/images');

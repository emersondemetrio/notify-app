const notifyApp = angular.module('NotificationsApp', [
	'ionic',
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

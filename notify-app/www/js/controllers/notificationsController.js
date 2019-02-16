const NotificationsCtrl = function ($scope, $interval) {
	$scope.notifications = [{
		id: 1,
		message: 'Hello'
	}];
}

notifyApp
	.controller('NotificationsCtrl', NotificationsCtrl);

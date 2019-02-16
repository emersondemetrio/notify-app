const NotificationsCtrl = function (
	$scope,
	notificationsService) {

	$scope.notifications = notificationsService.get().filter(n => !n.read);
	notificationsService.subscribe(notifications => {
		$scope.notifications = notifications;
		$scope.$apply();
	});
}

notifyApp
	.controller('NotificationsCtrl', NotificationsCtrl);

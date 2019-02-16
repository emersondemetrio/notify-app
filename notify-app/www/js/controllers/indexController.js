const IndexCtrl = function (
	$scope,
	$location,
	notificationsService) {

	$scope.notifications = notificationsService.get().filter(n => !n.read);
	notificationsService.subscribe(notifications => {
		$scope.notifications = notifications;
		$scope.$apply();
	});

	$scope.navigate = (path) => {
		$location.path(`/${path}`);
	}
}

notifyApp
	.controller('IndexCtrl', IndexCtrl);

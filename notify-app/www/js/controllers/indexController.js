const IndexCtrl = function (
	$scope,
	$state,
	notificationsService) {

	$scope.unsubscribed = false;

	$scope.notifications = notificationsService.get();

	notificationsService.subscribe(notifications => {
		if(!$scope.unsubscribed) {
			$scope.notifications = notifications;
		} else {
			$scope.notifications = [];
		}

		$scope.$apply();
	});

	$scope.navigate = () => {
		$scope.unsubscribed = true;
		$state.transitionTo('notifications', null, {
			reload: true,
			inherit: false,
			notify: true
		});
	};
}

notifyApp
	.controller('IndexCtrl', IndexCtrl);

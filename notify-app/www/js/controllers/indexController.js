const IndexCtrl = function (
	$scope,
	$state,
	notificationsService) {

	$scope.notifications = notificationsService.get();

	notificationsService.subscribe(notifications => {
		$scope.notifications = notifications;
		$scope.$apply();
	});

	$scope.navigate = () => {
		$state.transitionTo('notifications', null, {
			reload: true,
			inherit: false,
			notify: true
		});
	};
}

notifyApp
	.controller('IndexCtrl', IndexCtrl);

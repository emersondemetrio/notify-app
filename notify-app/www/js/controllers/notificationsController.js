const NotificationsCtrl = function (
	$scope,
	notificationsService) {

	$scope.modal = {
		isExpanded: false,
		element: document.getElementById('notifications-modal')
	};

	$scope.notifications = notificationsService.get();
	$scope.notification = {};

	const modalCtrl = {
		open: () => $scope.modal.element.style.display = 'block',
		close: () => $scope.modal.element.style.display = 'none',
		expand: () => {
			$scope.modal.isExpanded = true;
			$scope.modal.element.classList.add('expanded');
		}
	};

	if ($scope.notifications.length > 0) {
		$scope.notification = $scope.notifications[0];
		var currentDate = new Date();

		$scope.notification.receivedOn = Math.round(
			Math.abs(currentDate - new Date($scope.notification.date)) / 60000
		);

		modalCtrl.open();
	}

	$scope.expandNotification = () => {
		modalCtrl.expand();
	}

	$scope.reset = function() {
		$scope.notifications = [];
		$scope.notification = {};
	}

	$scope.closeNotification = (notificationId) => {
		console.log("notificationId", notificationId)
		notificationsService.setRead(notificationId);
		modalCtrl.close();
		// $scope.reset();
		// $location.path('/');
	}
}

notifyApp
	.controller('NotificationsCtrl', NotificationsCtrl);

const NotificationsCtrl = function (
	$scope,
	NotificationsService) {

	$scope.modal = {
		isExpanded: false,
		element: document.getElementById('notifications-modal')
	};

	$scope.notifications = NotificationsService.get();
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

	$scope.reset = function () {
		$scope.notifications = [];
		$scope.notification = {};
	}

	$scope.closeNotification = (notificationId) => {
		NotificationsService.setRead(notificationId);
		modalCtrl.close();
	}
}

notifyApp
	.controller('NotificationsCtrl', NotificationsCtrl);

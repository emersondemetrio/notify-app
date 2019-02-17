const NotificationsCtrl = function (
	$scope,
	$state,
	NotificationsService,
	StorageService,
	UploadsService) {

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

	$scope.propagateClickTo = function (target) {
		setTimeout(() => {
			document.getElementById(target).click();
		}, 0);
	}

	$scope.uploadAvatar = function (files) {
		var formData = new FormData();

		formData.append('image', files[0]);
		UploadsService
			.upload(formData)
			.success(function(res) {
				StorageService.set('avatar', res.resp.url);
				$state.transitionTo('index', null, {
					reload: true,
					inherit: false,
					notify: true
				});
			})
			.error(function(err) {
				alert('Unable to upload avatar.');
			});
	}
}

notifyApp
	.controller('NotificationsCtrl', NotificationsCtrl);

const IndexCtrl = function (
	$scope,
	$state,
	UploadsService,
	StorageService,
	NotificationsService) {

	$scope.avatarUrl = null;
	$scope.isLoading = false;

	$scope.unsubscribed = (
		StorageService.getJson('subscribeState') ?
			StorageService.getJson('subscribeState').unsubscribed
			: false
		);

	$scope.notifications = NotificationsService.get();

	NotificationsService.subscribe(notifications => {
		if(!$scope.unsubscribed) {
			$scope.notifications = notifications;
		} else {
			$scope.notifications = [];
		}

		$scope.$apply();
	});

	$scope.navigate = () => {
		StorageService.setJson('subscribeState', {
			unsubscribed: true
		});
		$scope.notifications = [];
		$state.transitionTo('notifications', null, {
			reload: true,
			inherit: false,
			notify: true
		});
	};

	if(StorageService.get('avatar')) {
		$scope.avatarUrl = StorageService.get('avatar');
	}

	$scope.propagateClickTo = function (target) {
		setTimeout(() => {
			document.getElementById(target).click();
		}, 0);
	}

	$scope.uploadAvatar = function (files) {
		$scope.isLoading = true;
		var formData = new FormData();

		formData.append('image', files[0]);
		UploadsService
			.upload(formData)
			.success(function(res) {
				StorageService.set('avatar', res.resp.url);
				$scope.avatarUrl = StorageService.get('avatar');
				$scope.isLoading = false;
			})
			.error(function(err) {
				alert('Unable to upload avatar.');
				$scope.isLoading = false;
			});
	}
}

notifyApp
	.controller('IndexCtrl', IndexCtrl);

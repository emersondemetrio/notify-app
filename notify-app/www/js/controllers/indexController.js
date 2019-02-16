const IndexCtrl = function ($scope, $interval) {
	$scope.notifications = [];

	// $interval(() => {
	// 	if ($scope.notifications.length > 0)
	// 		$scope.notifications = []
	// 	else
	// 		$scope.notifications = [1]

	// 	console.log($scope.notifications)
	// }, 1000)
}

notifyApp
	.controller('IndexCtrl', IndexCtrl);

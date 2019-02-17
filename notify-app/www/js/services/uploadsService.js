notifyApp
	.factory('UploadsService', function (REMOTE_UPLOAD_URL, $http) {

		function upload(formData) {
			var options = {
				withCredentials: false,
				headers: {
					'Content-Type': undefined
				},
				transformRequest: angular.identity
			};

			return $http.post(REMOTE_UPLOAD_URL, formData, options);
		}

		return {
			upload: upload
		};
	});

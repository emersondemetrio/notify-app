var UserController = function ($scope, $cordovaCamera, $ionicPlatform) {
	$scope.addImage = angular.noop;

	$ionicPlatform.ready(function () {

		$scope.images = [];

		$scope.addImage = function () {
			// 2
			var options = {
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
				allowEdit: false,
				encodingType: Camera.EncodingType.JPEG,
				popoverOptions: CameraPopoverOptions,
			};

			// 3
			$cordovaCamera
				.getPicture(options)
				.then(function (imageData) {

					// 4
					onImageSuccess(imageData);

					function onImageSuccess(fileURI) {
						createFileEntry(fileURI);
					}

					function createFileEntry(fileURI) {
						window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
					}

					// 5
					function copyFile(fileEntry) {
						var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
						var newName = makeid() + name;

						window
							.resolveLocalFileSystemURL(
								cordova.file.dataDirectory, function (fileSystem2) {
									fileEntry.copyTo(
										fileSystem2,
										newName,
										onCopySuccess,
										fail
									);
								},
								fail);
					}

					// 6
					function onCopySuccess(entry) {
						$scope.$apply(function () {
							$scope.images.push(entry.nativeURL);
						});
					}

					function fail(error) {
						console.log("fail: " + error.code);
					}

					function makeid() {
						var text = "";
						var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

						for (var i = 0; i < 5; i++) {
							text += possible.charAt(Math.floor(Math.random() * possible.length));
						}
						return text;
					}

				}, function (err) {
					console.log(err);
				});
		}

	});

}

// notifyApp
// 	.controller('UserCtrl', UserController);

notifyApp
	.factory('ImageService', function ($cordovaCamera, FileService, $q, $cordovaFile) {

		function makeid() {
			var text = '';
			var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

			for (var i = 0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		};

		function optionsForType(type) {
			var source;
			switch (type) {
				case 0:
					source = Camera.PictureSourceType.CAMERA;
					break;
				case 1:
					source = Camera.PictureSourceType.PHOTOLIBRARY;
					break;
			}
			return {
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: source,
				allowEdit: false,
				encodingType: Camera.EncodingType.JPEG,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false
			};
		}

		function saveMedia(type) {
			return $q(function (resolve, reject) {
				var options = optionsForType(type);

				$cordovaCamera.getPicture(options).then(function (imageUrl) {
					var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
					var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
					var newName = makeid() + name;
					$cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
						.then(function (info) {
							FileService.storeImage(newName);
							resolve();
						}, function (e) {
							reject();
						});
				});
			})
		}
		return {
			handleMediaDialog: saveMedia
		}
	});

notifyApp
	.controller(
		'UserCtrl', function (
			$scope,
			$timeout,
			$cordovaDevice,
			$cordovaFile,
			$ionicPlatform,
			$cordovaEmailComposer,
			$ionicActionSheet,
			ImageService,
			FileService) {

			$ionicPlatform.ready(function () {
				if(!$scope.$$phase) {
				$scope.images = FileService.images();
				$timeout($scope.$apply(), 1000)
				}
			});

			$scope.urlForImage = function (imageName) {
				var trueOrigin = cordova.file.dataDirectory + imageName;
				return trueOrigin;
			}

			$scope.addMedia = function () {
				$scope.hideSheet = $ionicActionSheet.show({
					buttons: [
						{ text: 'Take photo' },
						{ text: 'Photo from library' }
					],
					titleText: 'Add images',
					cancelText: 'Cancel',
					buttonClicked: function (index) {
						$scope.addImage(index);
					}
				});
			}

			$scope.addImage = function (type) {
				$scope.hideSheet();
				ImageService.handleMediaDialog(type).then(function () {
					$scope.$apply();
				});
			}

			// $scope.sendEmail = function () {
			// 	if ($scope.images != null && $scope.images.length > 0) {
			// 		var mailImages = [];
			// 		var savedImages = $scope.images;
			// 		if ($cordovaDevice.getPlatform() == 'Android') {
			// 			// Currently only working for one image..
			// 			var imageUrl = $scope.urlForImage(savedImages[0]);
			// 			var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
			// 			var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
			// 			$cordovaFile.copyFile(namePath, name, cordova.file.externalRootDirectory, name)
			// 				.then(function (info) {
			// 					mailImages.push('' + cordova.file.externalRootDirectory + name);
			// 					$scope.openMailComposer(mailImages);
			// 				}, function (e) {
			// 					reject();
			// 				});
			// 		} else {
			// 			for (var i = 0; i < savedImages.length; i++) {
			// 				mailImages.push('' + $scope.urlForImage(savedImages[i]));
			// 			}
			// 			$scope.openMailComposer(mailImages);
			// 		}
			// 	}
			// }

			// $scope.openMailComposer = function (attachments) {
			// 	var bodyText = '<html><h2>My Images</h2></html>';
			// 	var email = {
			// 		to: 'some@email.com',
			// 		attachments: attachments,
			// 		subject: 'Devdactic Images',
			// 		body: bodyText,
			// 		isHtml: true
			// 	};

			// 	$cordovaEmailComposer.open(email).then(null, function () {
			// 		for (var i = 0; i < attachments.length; i++) {
			// 			var name = attachments[i].substr(attachments[i].lastIndexOf('/') + 1);
			// 			$cordovaFile.removeFile(cordova.file.externalRootDirectory, name);
			// 		}
			// 	});
			// }
		});
var UserController = function ($scope, $cordovaCamera, $ionicPlatform) {
	$scope.takePicture = angular.noop;

	$ionicPlatform.ready(function () {
		$scope.takePicture = function () {

			// Object to save to Parse that includes an image
			$scope.listingImageObject = {
				text: "",
				image: null,
			};

			var options = {
				quality: 75,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				encodingType: Camera.EncodingType.JPEG,
				allowEdit: true,
				targetWidth: 300,
				targetHeight: 300,
				saveToPhotoAlbum: false
			};

			$cordovaCamera.getPicture(options).then(function (imageData) {
				//Retrieve Image URI so that the photo can be previewed in the app
				$scope.imgURI = "data:image/jpeg;base64," + imageData;
				// Turn image into base64 string so that it can be uploaded to Parse
				$scope.dataToSubmit = { __ContentType: "image/jpeg", base64: imageData };
			}, function (err) {
				// An error occurred. Show a message to the user
				alert("Error taking picture: " + err);
			})
		};
	});

	$scope.listing = {};

	// Function to upload the image via createImage service
	$scope.createImage = function () {
		// Listings.createImage({
		// 	listingImage: $scope.listing.dataToSubmit
		// }).success(function (data) {
		// 	alert("Your image has been submitted!");
		// 	createImageObject(result.data);
		// });
	};

	// Function to associate the uploaded image with a reference object, and upload that to Parse via createImageObject service
	$scope.createImageObject = function () {
		// listingImageObject.image = { name: "image.jpg", __type: "File" };
		// Listings.createImageObject({
		// 	listingImageObject: $scope.listing.listingImageObject
		// }).success(function (data) {
		// 	alert("Your image object has been submitted!");
		// });
	};
}


notifyApp
	.controller('UserCtrl', UserController);

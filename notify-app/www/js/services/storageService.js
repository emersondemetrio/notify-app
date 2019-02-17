notifyApp
	.factory('StorageService', function (APP_STORAGE_KEY) {

		function getJson(key) {
			return JSON.parse(get(key));
		}

		function setJson(key, value) {
			set(key, JSON.stringify(value));
		}

		function get(key) {
			return localStorage.getItem(`${APP_STORAGE_KEY}-${key}`);
		}

		function set(key, value) {
			localStorage.setItem(`${APP_STORAGE_KEY}-${key}`, value);
		}

		return {
			get: get,
			getJson: getJson,
			set: set,
			setJson: setJson
		};
	});

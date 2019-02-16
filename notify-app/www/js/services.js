const storage = {
	set: (key, value) => localStorage.setItem(key, value),
	get: key => localStorage.get(key)
};

notifyApp
	.factory('notificationsService', (
		$rootScope,
		APP_STORAGE_KEY,
		REMOTE_NOTIFICATIONS_URL) => {
		const storageKey = `${APP_STORAGE_KEY}-notifications`;

		return {
			subscribe: (callback) => {
				const socket = io(REMOTE_NOTIFICATIONS_URL);
				socket.on('notifications', notifications => {
					const parsed = JSON.parse(notifications).map(n => {
						n.read = false;
						return n;
					});
					storage.set(storageKey, JSON.stringify(parsed))
					$rootScope.$emit('notificationsReceived', callback(parsed));
				});
			},

			get: () => JSON.parse(localStorage.getItem(storageKey)) || [],

			setRead: id => storage.set(
				storageKey,
				JSON.stringify(
					JSON.parse(localStorage.get(storageKey))
						.filter(n => n.id !== id)
				)
			)
		}
	});

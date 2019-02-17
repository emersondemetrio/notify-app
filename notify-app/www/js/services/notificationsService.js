notifyApp
	.factory('NotificationsService', (
		$rootScope,
		StorageService,
		REMOTE_NOTIFICATIONS_URL
	) => {
		const storageKey = 'notifications';

		return {
			subscribe: (callback) => {
				const socket = io(REMOTE_NOTIFICATIONS_URL);
				socket.on('notifications', notifications => {
					const parsed = JSON.parse(notifications).map(n => {
						n.read = false;
						return n;
					});

					StorageService.setJson(storageKey, parsed);
					$rootScope.$emit('notificationsReceived', callback(parsed));
				});
			},

			get: () => {
				const notifications = StorageService.get(storageKey);
				if (notifications && notifications !== null) {
					return JSON.parse(notifications).filter(n => !n.read);
				}
				return [];
			},

			setRead: id => StorageService.setJson(
				storageKey,
				StorageService.getJson(storageKey).filter(n => n.id !== id)
			)
		}
	});

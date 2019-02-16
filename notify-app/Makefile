all: start-local

start-local:
	@echo "Testing"
	ionic serve

install:
	rm -rf node_modules && npm install

android-build:
	ionic cordova build --release android

javasigner:
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /home/emersondemetrio/androidKeys/my-release-key.keystore /home/emersondemetrio/projects/youper-test/notify-app/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name

zipalign:
	zipalign -v 4 /home/emersondemetrio/projects/youper-test/notify-app/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk Youper.apk

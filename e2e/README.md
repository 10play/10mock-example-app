# Testing guide

## Running tests:

### Android:

1. If changes occurred in the app run `build-detox-android-release`
2. Run `npx 10mock` to start the mock server
3. Make sure that the nexus 6 emulator is the only android emulator running
4. In another terminal run `test-detox-android-release` to start testing

### Ios:

1. If changes occurred in the app run `build-detox-ios`
2. Run `npx 10mock` to start the mock server
3. In another terminal run `test-detox-ios` to start testing

#### notes:

- Make sure your app is up to date with the latest translations (so everything will go well in the ci/cd)
- Use the logs from 10mock to check if your mocks working well

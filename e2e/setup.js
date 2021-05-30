/* eslint-env detox/detox, mocha */
const {execSync} = require('child_process');

beforeAll(async () => {
  execSync('xcrun simctl status_bar booted override --time "Cocktails"');
});

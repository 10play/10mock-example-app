const {execSync} = require('child_process');
const {
  existsSync,
  createReadStream,
  createWriteStream,
  readFileSync,
  mkdirSync,
  unlink,
  writeFileSync,
} = require('fs');
const {resolve} = require('path');
const pixelMatch = require('pixelmatch');
const sharp = require('sharp');
const {PNG} = require('pngjs');

const command =
  'adb shell dumpsys window | grep cur= |tr -s " " | cut -d " " -f 4|cut -d "=" -f 2';

const getConfig = (file) => {
  if (file) {
    const data = readFileSync(file);
    const png = PNG.sync.read(data);
    const {height: iosHeight, width: iosWidth} = png;
    return {top: 90, left: 0, height: iosHeight - 170, width: iosWidth};
  }
  let [width, height] = execSync(command)
    .toString()
    .split('x')
    .map((measure) => parseInt(measure));
  height = height - 270;
  return {top: 100, left: 0, width, height};
};

const SCREENSHOT_OPTIONS = {
  timeout: 10000,
  killSignal: 'SIGKILL',
};
export const getDevicePlatform = (testRunner) => {
  if (testRunner === 'appium') {
    // appium
    // eslint-disable-next-line
    return driver.getCapabilities().getCapability('platformName');
  }
  if (testRunner === 'detox') {
    // detox
    // eslint-disable-next-line
    return device.getPlatform();
  }
  console.error('Platform target not detected, detox or appium not detected');
  return null;
};
export const saveScreenshot = (directory, fileName) => {
  mkdirSync(resolve(directory));
};
class Setup {
  constructor(
    tmpPath = 'tmp',
    savePath = 'screenshots',
    basePath = '',
    testRunner,
  ) {
    /**
     * Creates a screenshot based on android or iOS platform.
     */
    this.createScreenshot = async (
      identifier,
      subDir = '',
      config = this.config,
    ) => {
      const {savePath, tmpPath, testRunner} = config;
      const platform = getDevicePlatform(testRunner); // appium or detox
      if (!platform || !tmpPath) {
        return;
      }
      if (!existsSync(resolve(tmpPath, subDir))) {
        mkdirSync(resolve(tmpPath, subDir));
      }
      const file = resolve(tmpPath, subDir, `${identifier}-full.png`);
      switch (platform) {
        case 'ios':
          execSync(
            `xcrun simctl io booted screenshot ${file}`,
            SCREENSHOT_OPTIONS,
          );
          break;
        case 'android':
          execSync(
            `adb shell screencap -p | perl -pe 's/\x0D\x0A/\x0A/g' > ${file}`,
          );
          break;
        default:
          console.warn(`Unsupported OS: ${platform}, screenshots disabled`);
          return null;
      }

      const configs = getConfig(platform === 'ios' ? file : null);
      await new Promise((resolve, reject) => {
        sharp(file)
          .extract(configs)
          .toFile(`${tmpPath}/${subDir}/${identifier}.png`, (err) => {
            if (err) {
              reject(`crop err:${err.message}`);
            }
            resolve('done cropping');
          });
      });
    };
    /**
     * Creates a pixel diff image which highlights areas that do not match between two images
     * can override path using config
     */
    this.pixelDiff = (
      name,
      subDir = '',
      pixelFlexibility,
      config = this.config,
    ) => {
      const {savePath, tmpPath} = config;
      const filename = `${name}.png`;
      const getSavePath = () => resolve(savePath, subDir, filename); // TODO make memoization fn
      const getTmpPath = () => resolve(tmpPath, subDir, filename); // TODO make memoization fn
      if (!existsSync(getTmpPath())) {
        return console.error('Temp file does not exist');
      }
      if (!existsSync(resolve(savePath, subDir))) {
        mkdirSync(resolve(savePath, subDir));
      }
      if (!existsSync(getSavePath())) {
        const readStream = createReadStream(getTmpPath());
        const writeStream = createWriteStream(getSavePath());
        readStream.on('error', () => console.log('error with read stream'));
        writeStream.on('error', () => console.log('written'));
        readStream.on('close', function () {
          unlink(getTmpPath(), () => console.log('unlinked old path'));
        });
        console.log(`Success: Moved ${filename} to saved folder`);
        readStream.pipe(writeStream);
        return;
      }
      const tmpImage = PNG.sync.read(readFileSync(getTmpPath()));
      const saveImage = PNG.sync.read(readFileSync(getSavePath()));
      const {width, height} = saveImage;
      const diff = new PNG({width, height});
      const diffCount = pixelMatch(
        saveImage.data,
        tmpImage.data,
        diff.data,
        width,
        height,
        {
          threshold: 0.1,
        },
      );
      if (diffCount) {
        console.log(`%c diffCount: ${diffCount}`, 'color:red');
      } else {
        console.log('%c  ✓ no diff found', 'color:green');
      }
      if (pixelFlexibility ? diffCount > pixelFlexibility : diffCount > 20) {
        writeFileSync(
          resolve(tmpPath, subDir, `diff-${filename}`),
          PNG.sync.write(diff),
        );
        throw new Error('not matched');
      }
    };
    this.config = this.createConfig(tmpPath, savePath, basePath, testRunner);
  }

  createConfig(tmpPath, savePath, basePath, testRunner) {
    if (!testRunner) {
      throw new Error(
        'Error: Test Runner not provided, please choose appium or detox',
      );
    }
    const platform = getDevicePlatform(testRunner); // appium or detox
    let flexibleBasePath = basePath;
    if (platform === 'ios') {
      flexibleBasePath += '_ios';
    }
    if (!existsSync(resolve(flexibleBasePath))) {
      mkdirSync(resolve(flexibleBasePath));
    }
    if (!existsSync(resolve(flexibleBasePath, savePath))) {
      mkdirSync(resolve(flexibleBasePath, savePath));
    }
    if (!existsSync(resolve(flexibleBasePath, tmpPath))) {
      mkdirSync(resolve(flexibleBasePath, tmpPath));
    }
    const baseURL = resolve(flexibleBasePath);
    return {
      basePath: baseURL,
      savePath: resolve(flexibleBasePath, savePath),
      testRunner,
      tmpPath: resolve(flexibleBasePath, tmpPath),
    };
  }
}
export default Setup;

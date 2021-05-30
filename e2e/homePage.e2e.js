/* eslint-env detox/detox, mocha */

import {
  testScreenshot,
  api,
  HOME_SCREEN_FOLDER,
  RANDOM_COCKTAIL_BTN,
  waitForElm,
  RANDOM_COCKTAIL_URL_SUFFIX,
  RANDOM_COCKTAIL,
  WORKFLOW_SEARCHINPUT_DIFFCOUNT,
} from './helpers';
import {randomCocktailMockData1, randomCocktailMockData2} from './mocks';
jest.setTimeout(440000);

let randomCocktailMockApi;
describe('Home page tests', () => {
  beforeAll(async () => {
    await api.finishTest();
    randomCocktailMockApi = await api
      .nock(RANDOM_COCKTAIL_URL_SUFFIX)
      .method('get')
      .status(200)
      .send(randomCocktailMockData1);
    await device.reloadReactNative();
  });

  it('Home page should be pixel perfect', async () => {
    await waitForElm(RANDOM_COCKTAIL);
    await expect(element(by.id(RANDOM_COCKTAIL))).toBeVisible();
    await testScreenshot(
      'mainPage',
      HOME_SCREEN_FOLDER,
      WORKFLOW_SEARCHINPUT_DIFFCOUNT,
    );
  });

  it('Random cocktail button should change current cocktail', async () => {
    await randomCocktailMockApi.deleteRoute();
    randomCocktailMockApi = await api
      .nock(RANDOM_COCKTAIL_URL_SUFFIX)
      .method('get')
      .status(200)
      .send(randomCocktailMockData2);
    await element(by.id(RANDOM_COCKTAIL_BTN)).tap();
    await waitForElm(RANDOM_COCKTAIL);
    await expect(element(by.id(RANDOM_COCKTAIL))).toBeVisible();
    await testScreenshot(
      'mainPage2',
      HOME_SCREEN_FOLDER,
      WORKFLOW_SEARCHINPUT_DIFFCOUNT,
    );
  });
});

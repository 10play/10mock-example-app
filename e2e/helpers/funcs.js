/* eslint-env detox/detox, mocha */

const jestExpect = require('expect');

export const replaceText = async (elm, text) => {
  await element(by.id(elm)).replaceText(text);
};

export const swipeTo = async (dir, screen, speed = 'fast', times = 1) => {
  const direction = dir === 'bottom' ? 'up' : 'down';
  for (let i = 0; i < times; i += 1) {
    await element(by.id(screen)).swipe(direction, speed, 0.6, 0.5, 0.4);
  }
};

export const scrollTo = async (testID, direction, scrollPoint = 500) => {
  await element(by.id(testID)).scroll(
    scrollPoint,
    direction,
    NaN,
    (direction === 'up' ? -0.5 : 0) + 0.75,
  );
};

export const goTo = async (elm, dir, speed = 'slow') => {
  await element(by.id(elm)).swipe(dir === 'down' ? 'up' : 'down', speed, 0.9);
};

export const delay = (secs) =>
  new Promise((resolve) => setTimeout(resolve, secs * 1000));

export const waitForElm = async (elementId, time = 20000) => {
  await waitFor(element(by.id(elementId)))
    .toBeVisible()
    .withTimeout(time);
};

export const typeAndExitKeyboard = async (input, text, screen = null) => {
  await waitForElm(input);
  await element(by.id(input)).replaceText(text);

  if (screen) {
    try {
      await element(by.id(screen)).tap({x: 10, y: 10}); // exit keyboard mode
    } catch {}
  }
};

export const tapByText = async (text) => {
  await element(by.text(text)).tap({x: 10, y: 10});
};

export const scroll = async (elm, dir) => {
  await element(by.id(elm)).scrollTo(dir);
};

export const testApiRequestsCount = async ({getCount}, expectedCount) => {
  const count = await getCount();
  if (count !== expectedCount) {
    throw new Error(`expected requests count: ${expectedCount}, got: ${count}`);
  }
};

export const checkMockRequestBody = async (
  {getStubRequests},
  expectedBody,
  index,
) => {
  const requests = await getStubRequests();
  const {body} = requests[index];
  jestExpect(body).toEqual(expectedBody);
};

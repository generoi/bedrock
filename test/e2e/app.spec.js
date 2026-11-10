import {test, expect} from '@playwright/test';
import {collectErrors} from './console.js';

// Post-deploy smoke test: the front page renders through the theme with its
// built assets. Runs in CI after every deploy (e2e:test).

test('The front page loads', async ({page}) => {
  const response = await page.goto('/');
  expect(response.status()).toBe(200);

  await page.waitForLoadState();
  expect(await page.title()).not.toBe('');
});

test('Theme assets are attached', async ({page}) => {
  await page.goto('/');
  await page.waitForLoadState();

  await expect(page.locator('script[id="sage/app.js-js"]')).toBeAttached();
  // WordPress inlines the stylesheet while it is under its inline size limit,
  // so it is either linked or printed into `sage/app.css-inline-css`.
  await expect(
    page.locator('link[id="sage/app.css-css"], style[id="sage/app.css-inline-css"]'),
    'app.css linked or inlined',
  ).not.toHaveCount(0);
});

test('No console errors or failed requests on the front page', async ({page}) => {
  const errors = collectErrors(page);

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(errors, errors.join('\n')).toEqual([]);
});

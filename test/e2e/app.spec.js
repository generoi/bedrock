import {test, expect} from '@playwright/test';

test('Page loads', async ({page}) => {
  // go to home page
  await page.goto('/?utm_source=monitoring');

  await page.waitForLoadState();
  expect(await page.title()).toContain('Bedrock');

  await expect(page.locator('script[id="sage/app.js-js"]')).toBeAttached();

  await page.screenshot({path: 'screenshot.jpg', fullPage: true});

  // close test
  await page.close();
});

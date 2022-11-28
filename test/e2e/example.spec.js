const { test, expect } = require('@playwright/test');

test('Example', async({page}) => {
  // go to home page
  await page.goto('/?utm_source=monitoring');

  // take screenshot
  await page.screenshot({ path: 'example.jpg' });

  // close test
  await page.close()
});

import {test, expect} from '@playwright/test';
import {sitemap} from './discover.js';

// Site-wide checks that need no site copy: pages come from the sitemaps.

test('An unknown URL returns a real 404', async ({page}) => {
  const response = await page.goto('/e2e-page-that-does-not-exist/');

  expect(response.status()).toBe(404);
});

test('The front page raises no uncaught page errors', async ({page}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(errors).toEqual([]);
});

test('Every page in the sitemap returns 200', async ({request, baseURL}) => {
  const paths = await sitemap(request, 'page');
  test.skip(!paths.length, 'No page sitemap on this site');

  test.setTimeout(paths.length * 30000);
  const {host} = new URL(baseURL);
  const failed = [];
  for (const path of paths) {
    // A per-request limit, so one hanging page is reported with the rest
    // instead of timing out the whole test. Redirects are followed (an empty
    // cart sends /checkout/ to /cart/) but must stay on this host.
    const result = await request
      .get(path, {timeout: 20000})
      .then((response) =>
        new URL(response.url()).host === host
          ? response.status()
          : `redirected to ${response.url()}`,
      )
      .catch(() => 'timeout');
    if (result !== 200) {
      failed.push(`${result} ${path}`);
    }
  }

  expect(failed, failed.join('\n')).toEqual([]);
});

test('A product page renders without page errors', async ({page, request}) => {
  const [product] = await sitemap(request, 'product');
  test.skip(!product, 'No WooCommerce products on this site');

  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  const response = await page.goto(product);
  expect(response.status()).toBe(200);
  await expect(page.locator('body')).toHaveClass(/\bsingle-product\b/);
  await page.waitForLoadState('networkidle');

  expect(errors).toEqual([]);
});

import {test, expect} from '@playwright/test';
import {sitemap} from './discover.js';

// Visual regression against baselines generated locally (e2e:visual:update),
// never in CI. Pages come from the sitemaps, so the set follows the content of
// whichever database the baselines were taken from.

const PAGE_LIMIT = 10;

function slugify(path) {
  return path.replace(/\//g, '-').replace(/^-|-$/g, '') || 'home';
}

test('visual regression', async ({page, context, request, baseURL}) => {
  test.setTimeout(PAGE_LIMIT * 30000);

  // Block third-party requests so embeds, analytics and consent banners don't
  // affect layout.
  const {hostname} = new URL(baseURL);
  await context.route('**', (route) =>
    new URL(route.request().url()).hostname === hostname
      ? route.continue()
      : route.abort(),
  );

  const [product] = await sitemap(request, 'product');
  const paths = [
    ...new Set(['/', ...(await sitemap(request, 'page')), product]),
  ]
    .filter((path) => path?.startsWith('/'))
    .slice(0, PAGE_LIMIT);

  for (const path of paths) {
    await page.goto(path);
    await page.waitForLoadState('load');
    // Hide images, videos and iframes, keeping their layout box: their bytes
    // differ between environments and some fail to paint into a full-page
    // capture, so the same page would differ from itself between runs. Layout
    // shifts around them still fail the capture.
    await page.evaluate(() => {
      document.querySelectorAll('img, video, iframe').forEach((element) => {
        element.style.visibility = 'hidden';
      });
    });

    // Soft, so one changed page doesn't hide the rest.
    await expect
      .soft(page)
      .toHaveScreenshot(`${slugify(path)}.png`, {fullPage: true, timeout: 15000});
  }
});

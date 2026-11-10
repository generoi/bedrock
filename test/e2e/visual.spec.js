import {test, expect} from '@playwright/test';
import {pages, product} from './pages.js';

// Visual regression against baselines generated locally (e2e:visual:update),
// never in CI. Screenshots must match exactly, so everything that differs
// between two runs of the same page is frozen or hidden first instead of
// tolerated with a diff threshold.

function slugify(path) {
  return path.replace(/\//g, '-').replace(/^-|-$/g, '') || 'home';
}

test('visual regression', async ({page, context, baseURL}) => {
  const paths = [...pages, product].filter(Boolean);
  test.setTimeout(paths.length * 30000);

  // Block third-party requests so embeds, analytics and consent banners don't
  // affect layout.
  const {hostname} = new URL(baseURL);
  await context.route('**', (route) =>
    new URL(route.request().url()).hostname === hostname ?
      route.continue()
    : route.abort(),
  );

  // Freeze motion before any script runs: an in-flight transition or an
  // autoplaying carousel makes the same page differ from itself between runs.
  await context.addInitScript(() => {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
        caret-color: transparent !important;
      }
    `;
    document.addEventListener('DOMContentLoaded', () =>
      document.head.appendChild(style),
    );
  });

  for (const path of paths) {
    await page.goto(path);
    await page.waitForLoadState('load');

    await page.evaluate(async () => {
      // Load lazy images so the page height is final.
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        img.loading = 'eager';
      });
      await Promise.all(
        [...document.querySelectorAll('img')].map((img) =>
          img.decode().catch(() => {}),
        ),
      );
      await document.fonts.ready;

      // Size each image from its width/height attributes, not the file that
      // loaded. srcset candidates are rounded crops with slightly different
      // ratios, and the browser switches candidate when a full-page capture
      // resizes the viewport, which moved the front page by a pixel between
      // two captures (the gallery carousel then rounds its height).
      document.querySelectorAll('img[width][height]').forEach((img) => {
        img.style.aspectRatio = `${img.getAttribute('width')} / ${img.getAttribute('height')}`;
      });

      // Stop videos on their first frame, then hide media while keeping its
      // layout box. Uploads differ between production and DDEV, and some
      // images fail to paint into a full-page capture at all, so their pixels
      // say nothing about the theme. Layout shifts around them still fail.
      document.querySelectorAll('video').forEach((video) => {
        video.pause();
        video.currentTime = 0;
      });
      document.querySelectorAll('img, video, iframe').forEach((element) => {
        element.style.visibility = 'hidden';
      });
    });
    await page.waitForLoadState('networkidle');

    // Soft, so one changed page doesn't hide the rest.
    await expect.soft(page).toHaveScreenshot(`${slugify(path)}.png`, {
      fullPage: true,
    });
  }
});

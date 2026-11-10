import {test, expect} from '@playwright/test';
import {sitemap} from './discover.js';

// Polylang: each translated page names its translations with hreflang, they
// load on this host and link back, and the theme's language menu
// (gds/language-menu) points at the same URLs. Skips until a page is
// translated.

const PAGE_LIMIT = 10;

test('Translations link to each other through hreflang and the language menu', async ({
  page,
  request,
  baseURL,
}) => {
  const paths = ['/', ...(await sitemap(request, 'page'))];
  const {host} = new URL(baseURL);
  let checked = 0;

  for (const path of [...new Set(paths)].slice(0, PAGE_LIMIT)) {
    const response = await page.goto(path);
    if (response.status() !== 200) {
      continue; // site.spec.js reports it.
    }
    const self = new URL(page.url());
    const alternates = await page
      .locator('link[rel="alternate"][hreflang]:not([hreflang="x-default"])')
      .evaluateAll((links) =>
        links.map((link) => ({lang: link.hreflang, href: link.href})),
      );
    const others = alternates.filter(({href}) => href !== self.href);
    if (!others.length) {
      continue; // Not translated.
    }
    checked++;

    for (const {lang, href} of others) {
      const url = new URL(href);
      expect(url.host, `hreflang ${lang} on ${path} stays on this site`).toBe(
        host,
      );

      // The language menu links the same translation.
      await expect(
        page.locator(`.wp-block-gds-language-menu a[href="${href}"]`),
        `language menu on ${path} links ${href}`,
      ).not.toHaveCount(0);

      // And the translation loads, in its language, and links back.
      const translation = await request.get(href, {maxRedirects: 0});
      expect(translation.status(), href).toBe(200);
      const html = await translation.text();
      expect(html, `<html lang> on ${href}`).toMatch(
        new RegExp(`<html[^>]* lang="${lang.split('-')[0]}`, 'i'),
      );
      expect(html, `${href} links back to ${self.pathname}`).toContain(
        `href="${self.href}"`,
      );
    }
  }

  test.skip(!checked, 'No translated pages on this site yet');
});

// Consent, analytics and embed endpoints are noisy on hosts not registered
// with the provider, so they are not signal about the site itself.
const thirdParty =
  /cookiebot|consentcdn|googletagmanager|google-analytics|typekit|hotjar|clarity|linkedin|facebook|doubleclick|youtube|vimeo|maps\.googleapis|gstatic/i;

/**
 * Collects console errors, uncaught page errors and failed (>= 400) requests
 * on `page` from now on, leaving out third-party sources.
 *
 * @param {import('@playwright/test').Page} page
 * @return {string[]} Filled in as the page runs.
 */
export function collectErrors(page) {
  const errors = [];

  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));

  page.on('console', (msg) => {
    if (msg.type() !== 'error') {
      return;
    }
    // A failed subresource logs "Failed to load resource" with the URL only
    // in the message location, so match against both.
    const origin = msg.location()?.url ?? '';
    if (thirdParty.test(origin) || thirdParty.test(msg.text())) {
      return;
    }
    errors.push(`console: ${msg.text()} (${origin})`);
  });

  page.on('response', (response) => {
    if (response.status() >= 400 && !thirdParty.test(response.url())) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });

  return errors;
}

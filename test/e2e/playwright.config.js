export default {
  use: {
    // The installed Google Chrome, not the Chromium bundled with the pinned
    // @playwright/test, so the browser stays patched. GitHub's runners ship it.
    channel: 'chrome',
    headless: true,
    viewport: {width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    baseURL: process.env.URL || 'https://gdsbedrock.ddev.site',
  },
};

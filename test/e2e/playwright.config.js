export default {
  // Seeds cache-bypass cookies before the suite runs.
  globalSetup: './global-setup.js',
  timeout: 90000,
  outputDir: '../../test-results',
  use: {
    // The installed Google Chrome, not the Chromium bundled with the pinned
    // @playwright/test, so the browser stays patched. GitHub's runners ship it.
    channel: 'chrome',
    headless: true,
    viewport: {width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    baseURL: process.env.URL || 'https://gdsbedrock.ddev.site',
    storageState: 'state.json',
  },
  // Baselines are generated locally against DDEV (`e2e:visual:update`) and not
  // committed, so they never encode production content.
  snapshotDir: 'snapshots',
};

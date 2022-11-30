const config = {
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    baseURL: process.env.URL || 'https://<example-project>.ddev.site',
  },
};

module.exports = config;

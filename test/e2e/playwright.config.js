export default {
  use: {
    headless: true,
    viewport: {width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    baseURL: process.env.URL || 'https://gdsbedrock.ddev.site',
  },
};

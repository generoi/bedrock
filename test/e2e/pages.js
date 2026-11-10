/**
 * The pages the E2E specs visit. Keep it short and hand-picked: one page per
 * template or layout that matters, not every page on the site. A sitemap lists
 * far more than a test run needs, and its content changes with every edit.
 *
 * What belongs here:
 * - the front page (the language spec follows hreflang from each page to its
 *   translations, so they need no entries of their own)
 * - one page per page template or distinctive layout: a plain content page,
 *   a landing page built from the site's blocks, a listing (articles, cases)
 * - pages carrying a block that appears nowhere else on the list: a carousel
 *   with its navigation visible, tabs, an accordion, a form, a map or video
 * - one single post or custom post type of each kind
 * - WooCommerce: the shop, a filtered listing, one simple and one variable or
 *   grouped product, the cart
 *
 * Leave out pages that only repeat a layout already listed, pages that
 * redirect (checkout redirects to the cart while it is empty) and anything
 * behind a login. Every path must exist in production and in the DDEV copy of
 * its database, since the smoke specs run after each deploy.
 */
export const pages = [
  '/',
  '/sample-page/',
  '/articles/',
  '/shop/',
  '/shop-with-filters/',
  '/cart/',
];

/**
 * One product page, for the specs that check the single-product template.
 * Empty on a site without WooCommerce.
 */
export const product = '/product/shoes/';

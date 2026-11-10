/**
 * Finds the pages a spec needs on whatever site it runs against, from the
 * Yoast sitemaps, instead of hard-coding slugs or copy. A site without such a
 * page makes the spec skip, not fail.
 */
const cache = new Map();

/**
 * Site-relative paths listed in a Yoast sitemap, e.g. `page` or `product`.
 * Entries on another host (a misconfigured home URL) are kept as full URLs so
 * a spec requesting them fails visibly instead of testing the wrong site.
 *
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string}                                       type
 * @return {Promise<string[]>} Paths, empty when the sitemap does not exist.
 */
export function sitemap(request, type) {
  if (!cache.has(type)) {
    cache.set(
      type,
      (async () => {
        const response = await request.get(`/${type}-sitemap.xml`);
        if (!response.ok()) {
          return [];
        }
        const {host} = new URL(response.url());
        const xml = await response.text();
        return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => {
          const url = new URL(loc);
          return url.host === host ? url.pathname : url.href;
        });
      })(),
    );
  }
  return cache.get(type);
}

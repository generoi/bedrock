import {chromium} from '@playwright/test';

/**
 * Seed fake logged-in WordPress cookies so requests skip the Kinsta full-page
 * cache.
 *
 * Without this, a post-deploy run can be served the *pre-deploy* HTML straight
 * from cache and pass green against the build it was meant to verify. A
 * `?utm_source=monitoring` query string does not help: Kinsta strips `utm_*`
 * before building the cache key, so the response is still a HIT. Only a
 * logged-in cookie forces origin rendering:
 *
 *   plain request            -> x-kinsta-cache: HIT
 *   ?utm_source=monitoring   -> x-kinsta-cache: HIT
 *   with these cookies       -> x-kinsta-cache: BYPASS
 *
 * The values are deliberately bogus: WordPress rejects them as a session, but
 * the cache layer only pattern-matches the cookie *name*.
 */
export default async function globalSetup(config) {
  const project = config.projects[0];
  const {storageState, baseURL} = project.use;
  const {hostname} = new URL(baseURL);

  const browser = await chromium.launch({channel: project.use.channel});
  const context = await browser.newContext();

  await context.addCookies([
    {name: 'wordpress_sec_1', value: '1', path: '/', domain: hostname},
    {name: 'wordpress_logged_in_1', value: '1', path: '/', domain: hostname},
  ]);

  await context.storageState({path: storageState});
  await browser.close();
}

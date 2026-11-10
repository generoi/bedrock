import {test, expect} from '@playwright/test';
import {execSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {collectErrors} from './console.js';

/*
 * Block editor smoke tests. Local only, never CI:
 *
 *   npm run e2e:editor
 *
 * Needs WP-CLI access to the site under test (`ddev wp` by default, or set
 * WP_CLI): it creates a throwaway administrator, logs in, opens pages in the
 * editor, inserts and saves core blocks in a draft, and deletes both
 * afterwards. Skips when WP-CLI does not reach the site at baseURL.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// One user and session per run: two runs at once (a developer's and an
// agent's) would otherwise delete and recreate each other's user.
const RUN_ID = Date.now().toString(36);
const STORAGE_STATE = path.join(
  __dirname,
  `../../test-results/.auth-${RUN_ID}.json`,
);

const WP_CLI = process.env.WP_CLI || 'ddev wp';
const TEST_USER = `e2eeditor${RUN_ID}`;
const TEST_PASS = `E2e-${RUN_ID}-${Math.random().toString(36).slice(2)}`;
const PAGE_LIMIT = Number(process.env.EDITOR_PAGE_LIMIT || 8);

function wp(command) {
  return execSync(`${WP_CLI} ${command}`, {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
  })
    .split('\n')
    .filter((line) => !/^(Deprecated|Warning|Notice):/.test(line))
    .join('\n')
    .trim();
}

/**
 * The canvas is an iframe whenever every block in the post is apiVersion 3
 * (always from WP 7.1). Wait for whichever appears.
 *
 * @param {import('@playwright/test').Page} page
 */
async function openEditor(page, url) {
  await page.goto(url);
  await Promise.race([
    page
      .frameLocator('iframe[name="editor-canvas"]')
      .locator('.block-editor-block-list__layout')
      .first()
      .waitFor({state: 'visible', timeout: 60000}),
    page.waitForSelector('.block-editor-block-list__layout', {timeout: 60000}),
  ]);
  await page.waitForFunction(
    () => window.wp?.data?.select('core/editor').__unstableIsEditorReady?.() ?? true,
  );
  // The welcome guide and "Take over" dialogs would cover the canvas.
  await page.evaluate(() =>
    window.wp.data
      .dispatch('core/preferences')
      .set('core/edit-post', 'welcomeGuide', false),
  );
  const takeOver = page.getByRole('button', {name: 'Take over'});
  if (await takeOver.isVisible({timeout: 500}).catch(() => false)) {
    await takeOver.click();
  }
  await page.keyboard.press('Escape').catch(() => {});
}

/**
 * Blocks the editor could not validate against their save(), and blocks whose
 * edit component crashed.
 *
 * @param {import('@playwright/test').Page} page
 */
function brokenBlocks(page) {
  return page.evaluate(() => {
    const editor = window.wp.data.select('core/block-editor');
    const invalid = editor
      .getClientIdsWithDescendants()
      .map((id) => editor.getBlock(id))
      .filter((block) => block?.isValid === false)
      .map((block) => `invalid: ${block.name}`);
    const canvas = document.querySelector('iframe[name="editor-canvas"]');
    const crashed = [document, canvas?.contentDocument]
      .filter(Boolean)
      .flatMap((doc) => [...doc.querySelectorAll('.block-editor-warning')])
      .filter((warning) =>
        /cannot be previewed|has encountered an error/i.test(warning.textContent),
      )
      .map(
        (warning) =>
          `crashed: ${warning.closest('[data-type]')?.dataset.type ?? 'unknown'}`,
      );
    return [...invalid, ...crashed];
  });
}

test.describe('Block editor', () => {
  test.describe.configure({timeout: 180000});
  test.use({storageState: STORAGE_STATE});

  let pages = [];
  let created = false;

  test.beforeAll(async ({browser, baseURL}) => {
    let home;
    try {
      home = wp('option get home');
    } catch {
      test.skip(true, `WP-CLI (${WP_CLI}) is not available`);
    }
    test.skip(
      new URL(home).host !== new URL(baseURL).host,
      `WP-CLI reaches ${home}, not ${baseURL}`,
    );

    // test.use()'s storageState also applies to browser.newContext() below,
    // so the file has to exist before the login writes it.
    fs.mkdirSync(path.dirname(STORAGE_STATE), {recursive: true});
    fs.writeFileSync(STORAGE_STATE, JSON.stringify({cookies: [], origins: []}));

    wp(
      `user create ${TEST_USER} ${TEST_USER}@example.com --role=administrator --user_pass=${TEST_PASS}`,
    );
    created = true;
    // Skip the "is this still your admin email?" interstitial.
    wp(
      `option update admin_email_lifespan ${Math.floor(Date.now() / 1000) + 31536000}`,
    );

    pages = wp(
      `post list --post_type=page --post_status=publish --posts_per_page=${PAGE_LIMIT} --orderby=modified --order=DESC --field=ID`,
    )
      .split('\n')
      .filter(Boolean);

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/wp/wp-login.php');
    await page.waitForLoadState('load');
    // The login page's own scripts can clear a field while loading: fill
    // until both values hold, then submit.
    await expect(async () => {
      await page.locator('#user_login').fill(TEST_USER);
      await page.locator('#user_pass').fill(TEST_PASS);
      await expect(page.locator('#user_login')).toHaveValue(TEST_USER, {
        timeout: 1000,
      });
      await expect(page.locator('#user_pass')).toHaveValue(TEST_PASS, {
        timeout: 1000,
      });
    }).toPass({timeout: 20000});
    await page.click('#wp-submit');
    await page.waitForURL('**/wp-admin/**');
    await context.storageState({path: STORAGE_STATE});
    await context.close();
  });

  test.afterAll(() => {
    if (created) {
      try {
        // Hand anything the user authored to user 1 rather than deleting it.
        wp(`user delete ${TEST_USER} --yes --reassign=1`);
      } catch {
        // Already gone.
      }
    }
    fs.rmSync(STORAGE_STATE, {force: true});
  });

  test('Published pages open without broken blocks', async ({page}) => {
    test.skip(!pages.length, 'No published pages');
    const failures = [];

    for (const id of pages) {
      try {
        await openEditor(page, `/wp/wp-admin/post.php?post=${id}&action=edit`);
      } catch (error) {
        failures.push(`${id}: did not open: ${error.message.split('\n')[0]}`);
        continue;
      }
      for (const block of await brokenBlocks(page)) {
        failures.push(`${id}: ${block}`);
      }
    }

    expect(failures, failures.join('\n')).toEqual([]);
  });

  test('Core blocks insert, save and reopen without errors', async ({page}) => {
    const errors = collectErrors(page);
    await openEditor(page, '/wp/wp-admin/post-new.php?post_type=page');

    const inserted = await page.evaluate(() => {
      const {createBlock} = window.wp.blocks;
      const paragraph = (content) => createBlock('core/paragraph', {content});
      const blocks = [
        createBlock('core/heading', {content: 'E2E heading', level: 2}),
        paragraph('E2E paragraph'),
        createBlock('core/list', {}, [
          createBlock('core/list-item', {content: 'One'}),
          createBlock('core/list-item', {content: 'Two'}),
        ]),
        createBlock('core/quote', {}, [paragraph('E2E quote')]),
        createBlock('core/buttons', {}, [
          createBlock('core/button', {text: 'E2E button', url: '#'}),
        ]),
        createBlock('core/columns', {}, [
          createBlock('core/column', {}, [paragraph('Left')]),
          createBlock('core/column', {}, [paragraph('Right')]),
        ]),
        createBlock('core/group', {}, [paragraph('E2E group')]),
        createBlock('core/separator'),
        createBlock('core/spacer'),
      ];
      const {dispatch} = window.wp.data;
      dispatch('core/editor').editPost({title: 'E2E core blocks'});
      dispatch('core/block-editor').insertBlocks(blocks);
      return blocks.map((block) => block.name);
    });

    await page.evaluate(() => window.wp.data.dispatch('core/editor').savePost());
    await expect
      .poll(() =>
        page.evaluate(() => {
          const editor = window.wp.data.select('core/editor');
          return !editor.isSavingPost() && !editor.isEditedPostDirty();
        }),
      )
      .toBe(true);
    const id = await page.evaluate(() =>
      window.wp.data.select('core/editor').getCurrentPostId(),
    );

    try {
      const saved = wp(`post get ${id} --field=post_content`);
      for (const name of inserted) {
        expect(saved, `saved content has ${name}`).toContain(
          `<!-- wp:${name.replace(/^core\//, '')}`,
        );
      }

      // Reopened from the database, every block still validates.
      await openEditor(page, `/wp/wp-admin/post.php?post=${id}&action=edit`);
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              window.wp.data.select('core/block-editor').getBlocks().length,
          ),
        )
        .toBe(inserted.length);
      expect(await brokenBlocks(page)).toEqual([]);
      expect(errors, errors.join('\n')).toEqual([]);
    } finally {
      wp(`post delete ${id} --force`);
    }
  });
});

/**
 * `wp-scripts lint-js` resolves ESLint config from this workspace, and flat
 * config does not cascade. Without this file ESLint falls back to wp-scripts'
 * bundled defaults.
 */

export {default} from '../../../../eslint.config.mjs';

<?php

/**
 * Configuration overrides for WP_ENVIRONMENT_TYPE === 'staging'
 */

use Roots\WPConfig\Config;

/**
 * You should try to keep staging as close to production as possible. However,
 * should you need to, you can always override production configuration values
 * with `Config::define`.
 *
 * Example: `Config::define('WP_DEBUG', true);`
 * Example: `Config::define('DISALLOW_FILE_MODS', false);`
 */
Config::define('WP_HOME', 'https://staging-gdsbedrock-staging.kinsta.cloud');
Config::define('WP_SITEURL', Config::get('WP_HOME').'/wp');
Config::define('DISALLOW_FILE_EDIT', false);
Config::define('DISALLOW_FILE_MODS', false);
// Do not send out WP Mail SMTP emails
// @see https://wpmailsmtp.com/docs/how-to-secure-smtp-settings-by-using-constants/
Config::define('WPMS_ON', true);
Config::define('WPMS_DO_NOT_SEND', true);

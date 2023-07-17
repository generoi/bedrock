<?php

/**
 * Configuration overrides for WP_ENVIRONMENT_TYPE === 'development'
 */

use Roots\WPConfig\Config;

Config::define('SAVEQUERIES', php_sapi_name() !== 'cli');
Config::define('WP_DEBUG', true);
Config::define('WP_DEBUG_DISPLAY', true);
Config::define('SCRIPT_DEBUG', true);
Config::define('WP_DEBUG_LOG', true);
Config::define('WP_CACHE', false);
Config::define('WP_DISABLE_FATAL_ERROR_HANDLER', true);
Config::define('ACF_LITE', false);
/** Access /wp/wp-admin/maint/repair.php **/
Config::define('WP_ALLOW_REPAIR', true);
ini_set('display_errors', '1');

<?php
/**
 * Configuration overrides for WP_ENV === 'development'
 */

use Roots\WPConfig\Config;

Config::define('SAVEQUERIES', true);
Config::define('WP_DEBUG', true);
Config::define('WP_DEBUG_DISPLAY', true);
Config::define('SCRIPT_DEBUG', true);
Config::define('WPML_DEBUG_INSTALLER', true);
Config::define('WP_DEBUG_LOG', true);
Config::define('WP_CACHE', false);

/** Access /wp/wp-admin/maint/repair.php **/
Config::define('WP_ALLOW_REPAIR', true);

ini_set('display_errors', 1);

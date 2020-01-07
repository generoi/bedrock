<?php
/**
 * Your base production configuration goes in this file. Environment-specific
 * overrides go in their respective config/environments/{{WP_ENV}}.php file.
 *
 * A good default policy is to deviate from the production config as little as
 * possible. Try to define as much of your configuration in this file as you
 * can.
 */

use Roots\WPConfig\Config;

/** @var string Directory containing all of the site's files */
$root_dir = dirname(__DIR__);

/** @var string Document Root */
$webroot_dir = $root_dir . '/web';

/**
 * Expose global env() function from oscarotero/env
 */
Env::init();

/**
 * Use Dotenv to set required environment variables and load .env file in root
 */
$dotenv = Dotenv\Dotenv::create($root_dir);
if (file_exists($root_dir . '/.env')) {
    $dotenv->load();
    $dotenv->required(['WP_HOME', 'WP_SITEURL']);
    if (!env('DATABASE_URL')) {
        $dotenv->required(['DB_NAME', 'DB_USER', 'DB_PASSWORD']);
    }
}

/**
 * Set up our global environment constant and load its config first
 * Default: production
 */
define('WP_ENV', env('WP_ENV') ?: 'production');

/**
 * URLs
 */
Config::define('WP_HOME', env('WP_HOME'));
Config::define('WP_SITEURL', env('WP_SITEURL'));

/**
 * Custom Content Directory
 */
Config::define('CONTENT_DIR', '/app');
Config::define('WP_CONTENT_DIR', $webroot_dir . Config::get('CONTENT_DIR'));
Config::define('WP_CONTENT_URL', Config::get('WP_HOME') . Config::get('CONTENT_DIR'));

/**
 * DB settings
 */
Config::define('DB_NAME', env('DB_NAME'));
Config::define('DB_USER', env('DB_USER'));
Config::define('DB_PASSWORD', env('DB_PASSWORD'));
Config::define('DB_HOST', env('DB_HOST') ?: 'localhost');
Config::define('DB_CHARSET', 'utf8mb4');
Config::define('DB_COLLATE', 'utf8mb4_swedish_ci');
$table_prefix = env('DB_PREFIX') ?: 'wp_';

if (env('DATABASE_URL')) {
    $dsn = (object) parse_url(env('DATABASE_URL'));

    Config::define('DB_NAME', substr($dsn->path, 1));
    Config::define('DB_USER', $dsn->user);
    Config::define('DB_PASSWORD', isset($dsn->pass) ? $dsn->pass : null);
    Config::define('DB_HOST', isset($dsn->port) ? "{$dsn->host}:{$dsn->port}" : $dsn->host);
}

/**
 * Multisite
 */
/** Step 1: Uncomment this line and visit: /wp/wp-admin/network.php */
// Config::define('WP_ALLOW_MULTISITE', true);
/** Step 3: Edit your .env to include DOMAIN_CURRENT_SITE, eg. drupal-vm.dev */
/** Step 4: Uncomment the following lines */
// Config::define('MULTISITE', true);
// Config::define('SUBDOMAIN_INSTALL', true);
// Config::define('DOMAIN_CURRENT_SITE', env('DOMAIN_CURRENT_SITE'));
// Config::define('PATH_CURRENT_SITE', '/');
// Config::define('SITE_ID_CURRENT_SITE', 1);
// Config::define('BLOG_ID_CURRENT_SITE', 1);
/** Step 5: Uncomment the multisite lines in web/.htaccess */
// Config::define('ADMIN_COOKIE_PATH', '/');
// Config::define('COOKIE_DOMAIN', '');
// Config::define('COOKIEPATH', '');
// // Used by LOGGED_IN_COOKIE and needs to be available for front-end
// // otherwise Customizer fails.
// Config::define('SITECOOKIEPATH', '/');

/**
 * Authentication Unique Keys and Salts
 */
Config::define('AUTH_KEY', env('AUTH_KEY'));
Config::define('SECURE_AUTH_KEY', env('SECURE_AUTH_KEY'));
Config::define('LOGGED_IN_KEY', env('LOGGED_IN_KEY'));
Config::define('NONCE_KEY', env('NONCE_KEY'));
Config::define('AUTH_SALT', env('AUTH_SALT'));
Config::define('SECURE_AUTH_SALT', env('SECURE_AUTH_SALT'));
Config::define('LOGGED_IN_SALT', env('LOGGED_IN_SALT'));
Config::define('NONCE_SALT', env('NONCE_SALT'));

/**
 * Custom Settings
 */
Config::define('AUTOMATIC_UPDATER_DISABLED', true);
Config::define('DISABLE_WP_CRON', env('DISABLE_WP_CRON') ?: false);
Config::define('WP_POST_REVISIONS', 10);
Config::define('WP_DEFAULT_THEME', '<example-project>');
// Disable the plugin and theme file editor in the admin
Config::define('DISALLOW_FILE_EDIT', true);
// Disable plugin and theme updates and installation from the admin
Config::define('DISALLOW_FILE_MODS', true);
// Plugin settings
Config::define('WP_CACHE', true);
Config::define('WPCACHEHOME', Config::get('WP_CONTENT_DIR') . '/plugins/wp-super-cache/');
Config::define('WP_HIDE_DONATION_BUTTONS', true);
Config::define('EWWW_IMAGE_OPTIMIZER_SKIP_BUNDLE', true);
// Do not connect Jetpack to a WP account.
Config::define('JETPACK_DEV_DEBUG', true);

/** WP Mail SMTP hardcoded configuration */
Config::define('WPMS_ON', true);
Config::define('WPMS_MAILER', env('WPMS_MAILER') ?: 'mail');
// Defaults only usen in case WPMS_MAILER is set to `smtp`
Config::define('WPMS_SMTP_HOST', env('WPMS_SMTP_HOST') ?: 'smtp.multi.fi');
Config::define('WPMS_SMTP_PORT', env('WPMS_SMTP_PORT') ?: 465);
Config::define('WPMS_SSL', env('WPMS_SSL') ?: 'ssl');
Config::define('WPMS_SMTP_AUTH', env('WPMS_SMTP_AUTH') ?: false);

/**
 * Debugging Settings
 */
Config::define('WP_DEBUG_DISPLAY', false);
Config::define('SCRIPT_DEBUG', false);
ini_set('display_errors', '0');

/**
 * Allow WordPress to detect HTTPS when used behind a reverse proxy or a load balancer
 * See https://codex.wordpress.org/Function_Reference/is_ssl#Notes
 */
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

$env_config = __DIR__ . '/environments/' . WP_ENV . '.php';

if (file_exists($env_config)) {
    require_once $env_config;
}

Config::apply();

/**
 * Bootstrap WordPress
 */
if (!defined('ABSPATH')) {
    define('ABSPATH', $webroot_dir . '/wp/');
}

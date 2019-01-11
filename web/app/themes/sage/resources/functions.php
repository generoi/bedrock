<?php

/**
 * Do not edit anything in this file unless you know what you're doing
 */

use Roots\Sage\Config;
use Roots\Sage\Container;

/**
 * Helper function for prettying up errors
 * @param string $message
 * @param string $subtitle
 * @param string $title
 */
$sage_error = function ($message, $subtitle = '', $title = '') {
    $title = $title ?: __('Sage &rsaquo; Error', '<example-project>');
    $footer = '<a href="https://roots.io/sage/docs/">roots.io/sage/docs/</a>';
    $message = "<h1>{$title}<br><small>{$subtitle}</small></h1><p>{$message}</p><p>{$footer}</p>";
    wp_die($message, $title);
};

/**
 * Ensure compatible version of PHP is used
 */
if (version_compare('7.1', phpversion(), '>=')) {
    $sage_error(__('You must be using PHP 7.1 or greater.', 'sage'), __('Invalid PHP version', 'sage'));
}

/**
 * Ensure compatible version of WordPress is used
 */
if (version_compare('4.7.0', get_bloginfo('version'), '>=')) {
    $sage_error(__('You must be using WordPress 4.7.0 or greater.', '<example-project>'), __('Invalid WordPress version', '<example-project>'));
}

/**
 * Ensure dependencies are loaded
 */
if (!class_exists('Roots\\Sage\\Container')) {
    if (!file_exists($composer = __DIR__.'/../vendor/autoload.php')) {
        $sage_error(
            __('You must run <code>composer install</code> from the Sage directory.', '<example-project>'),
            __('Autoloader not found.', '<example-project>')
        );
    }
    require_once $composer;
}

/**
 * Ensure plugin requirements are activated.
 */
foreach ([
    'Timber' => 'timber-library/timber.php',
    'TimberExtended' => 'wp-timber-extended/wp-timber-extended.php',
    'acf' => 'advanced-custom-fields-pro/acf.php',
    'GeneroWP\\Hero\\Plugin' => 'wp-hero/wp-hero.php',
] as $class_name => $plugin) {
    if (!class_exists($class_name)) {
        $plugin_path = WP_CONTENT_DIR . '/plugins/' . $plugin;
        if (!file_exists($plugin_path)) {
            $sage_error(
                sprintf(__('You must download the %s (%s) plugin to use this theme', '<example-project>'), $class_name, $plugin),
                __('Unable to find required plugin', '<example-project>')
            );
        }
        require_once ABSPATH . '/wp-admin/includes/plugin.php';
        activate_plugin($plugin_path);
        require_once $plugin_path;

        if (class_exists($class_name)) {
            add_action('admin_notices', function () use ($class_name) {
                echo '<div class="notice notice-success is-dismissible">';
                echo '<p>' . sprintf(__('Activated plugin %s', '<example-project>'), $class_name) . '</p>';
                echo '</div>';
            });
        } else {
            $sage_error(
                sprintf(__('Unable to activate the plugin %s. This might be due to a breaking structural plugin change.', '<example-project>'), $plugin),
                __('Unable to activate plugin', '<example-project>')
            );
        }
    }
}

/**
 * Sage required files
 *
 * The mapped array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 */
array_map(function ($file) use ($sage_error) {
    $file = "../app/{$file}.php";
    if (!locate_template($file, true, true)) {
        $sage_error(sprintf(__('Error locating <code>%s</code> for inclusion.', '<example-project>'), $file), 'File not found');
    }
}, [
    'helpers',
    'setup',
    'filters',
    'admin',
    // Site specific.
    'images',
    'timber',
    'utils',
    'acf',
    'widgets',
    'popups',
    'performance',
    'tailor',
    // 'rewrites',
    'yoast',
    // 'facetwp',
    // 'gravityform',
    // 'woocommerce-hooks',
]);

/**
 * Here's what's happening with these hooks:
 * 1. WordPress initially detects theme in themes/sage/resources
 * 2. Upon activation, we tell WordPress that the theme is actually in themes/sage/resources/views
 * 3. When we call get_template_directory() or get_template_directory_uri(), we point it back to themes/sage/resources
 *
 * We do this so that the Template Hierarchy will look in themes/sage/resources/views for core WordPress themes
 * But functions.php, style.css, and index.php are all still located in themes/sage/resources
 *
 * This is not compatible with the WordPress Customizer theme preview prior to theme activation
 *
 * get_template_directory()   -> /srv/www/example.com/current/web/app/themes/sage/resources
 * get_stylesheet_directory() -> /srv/www/example.com/current/web/app/themes/sage/resources
 * locate_template()
 * ├── STYLESHEETPATH         -> /srv/www/example.com/current/web/app/themes/sage/resources/views
 * └── TEMPLATEPATH           -> /srv/www/example.com/current/web/app/themes/sage/resources
 */
array_map(
    'add_filter',
    ['theme_file_path', 'theme_file_uri', 'parent_theme_file_path', 'parent_theme_file_uri'],
    array_fill(0, 4, 'dirname')
);
Container::getInstance()
    ->bindIf('config', function () {
        return new Config([
            'app' => require dirname(__DIR__).'/config/app.php',
            'assets' => require dirname(__DIR__).'/config/assets.php',
            'theme' => require dirname(__DIR__).'/config/theme.php',
            'timber' => require dirname(__DIR__).'/config/timber.php',
            'foundation' => require dirname(__DIR__).'/config/foundation.php',
        ]);
    }, true);

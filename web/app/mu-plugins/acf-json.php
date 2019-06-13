<?php
/*
Plugin Name:  Set ACF JSON path
Plugin URI:   https://genero.fi
Description:  Set the ACF JSON path
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

if (!is_blog_installed()) {
    return;
}

add_filter('acf/settings/save_json', function ($path) {
    return WP_CONTENT_DIR . '/acf-json';
});

add_filter('acf/settings/load_json', function ($paths) {
    $paths[] = WP_CONTENT_DIR . '/acf-json';
    return $paths;
});

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

add_filter('acf/settings/save_json', function($path) {
    return WP_CONTENT_DIR . '/acf-json';
});

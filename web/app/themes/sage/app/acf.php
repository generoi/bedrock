<?php

/**
 * @file
 * Contains Advanced Custom Fields additions and field defaults.
 */

namespace App;

use Genero\Component\ArchivePageComponent;

/**
 * Associate pages with post types emulating archive pages.
 */
$archive_pages = new ArchivePageComponent();

/**
 * Add options page.
 */
add_filter('acf/init', 'acf_add_options_page');

/**
 * Add foundation palette colors for hero overlays.
 */
add_filter('acf/load_field/name=slide_overlay', function ($field) {
    $field['choices'] = ['none' => __('None', '<example-project>')] + sage('foundation')->palette('overlay');
    return $field;
});

/**
 * Configure our Google Maps API key.
 */
add_filter('acf/settings/google_api_key', function ($value) {
    return config('app.gmap.api_key');
});

/**
 * Fix Polylang acf.php:62 undefined post_id PHP notice.
 */
add_filter('acf/location/screen', function ($screen, $field_group) {
    if (function_exists('PLL') && !isset($screen['post_id'])) {
        $screen['post_id'] = null;
    }
    return $screen;
}, 10, 2);

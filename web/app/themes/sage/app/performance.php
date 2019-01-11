<?php

/**
 * @file
 * Contains performance enhancing configurations.
 */

namespace App;

/**
 * Disable Autoptimize for logged in users.
 */
add_filter('autoptimize_filter_noptimize', function () {
    return WP_CACHE ? is_user_logged_in() : true;
});

/**
 * Exclude certain JS files from Autoptimize.
 */
add_filter('autoptimize_filter_js_exclude', function ($exclude) {
    $scripts = [
        // Required by inline js wp.hooks.
        'facetwp/assets/js/src/event-manager.js',
    ];
    return $exclude . ', ' . implode(', ', $scripts);
});

/**
 * Exclude certain CSS files from Autoptimize.
 */
add_filter('autoptimize_filter_css_exclude', function ($exclude) {
    $styles = [
        'dist/styles/icons.css',
    ];
    return $exclude . ', ' . implode(', ', $styles);
});

/**
 * Prefetch DNS for external resources.
 */
add_filter('wp_resource_hints', function ($hints, $relation_type) {
    if ($relation_type == 'preconnect') {
        if (wp_style_is('font/google', 'queue')) {
            $hints[] = [
                'href' => 'https://fonts.gstatic.com',
                'crossorigin',
            ];
        }
        if (wp_style_is('font/typekit', 'queue')) {
            $hints[] = [
                'href' => 'https://use.typekit.net',
                'crossorigin',
            ];
        }
        // If upload dir is on a separate domain, preconnect.
        if (strpos(site_url(), Utils\get_upload_dir_domain()) === false) {
            $hints[] = [
                'href' => Utils\get_upload_dir_domain(),
            ];
        }
    }

    return $hints;
}, 10, 2);

/**
 * Load scripts asynchronously.
 */
add_filter('script_loader_tag', function ($tag, $handle) {
    $async_handles = [
        'sage/main.js',
    ];
    if (in_array($handle, $async_handles)) {
        return str_replace(' src', ' async="async" src', $tag);
    }
    return $tag;
}, 10, 2);

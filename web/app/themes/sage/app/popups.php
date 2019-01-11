<?php

/**
 * @file
 * Contains option additions for the Popups and Popup Extended plugins.
 */

namespace App;

/**
 * Customize the default values.
 */
add_filter('spu/metaboxes/default_options', function ($defaults) {
    return $defaults;
});

/**
 * Add custom trigger options.
 */
add_filter('popups-extended/trigger_options', function ($positions) {
    return $positions;
});

/**
 * Add custom positions..
 */
add_filter('popups-extended/positions', function ($positions) {
    return $positions;
});

/**
 * Add custom types.
 */
add_filter('popups-extended/types', function ($types) {
    return $types;
});

/**
 * Add custom themes.
 */
add_filter('popups-extended/themes', function ($themes) {
    $themes = $themes + sage('foundation')->palette('overlay');
    return $themes;
});

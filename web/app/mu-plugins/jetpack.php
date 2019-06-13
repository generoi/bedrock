<?php
/*
Plugin Name:  Jetpack Configurations
Plugin URI:   https://genero.fi
Description:  Jetpack Configurations
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

// This filter does not get called correctly in the theme.
add_filter('jetpack_active_modules', function ($modules) {
    $modules = array_merge($modules, [
        // https://jetpack.com/support/carousel/
        // 'carousel',
        // https://jetpack.com/support/copy-post-2/
        'copy-post',
        // https://jetpack.com/support/contact-form/
        'contact-form',
        // https://jetpack.com/support/infinite-scroll/
        // 'infinite-scroll',
        // https://jetpack.com/support/lazy-images/
        // 'lazy-images',
        // https://jetpack.com/support/markdown/
        'markdown',
        // https://jetpack.com/support/widget-visibility/
        'widget-visibility',
    ]);

    return array_values($modules);
});

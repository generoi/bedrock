<?php

/**
 * Theme setup.
 */

namespace App;

use function Roots\asset;

/**
 * Register the theme assets.
 *
 * @return void
 */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('sage/gds.js', asset('gds/dist/gds/gds.esm.js')->uri(), [], null, false);
    wp_enqueue_script('sage/app.js', asset('scripts/app.js')->uri(), [], null, true);
    wp_enqueue_script('sage/fontawesome.js', 'https://kit.fontawesome.com/033b65fee9.js', [], null, false);

    wp_add_inline_script('sage/app.js', asset('scripts/manifest.js')->contents(), 'before');

    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    wp_enqueue_style('sage/app.css', asset('styles/app.css')->uri(), [], null);
}, 100);

/**
 * Register the theme assets with the block editor.
 *
 * @return void
 */
add_action('enqueue_block_editor_assets', function () {
    if ($manifest = asset('scripts/editor.asset.php')->load()) {
        wp_enqueue_script('sage/gds.js', asset('gds/dist/gds/gds.esm.js')->uri(), [], null, false);
        wp_enqueue_script('sage/editor.js', asset('scripts/editor.js')->uri(), $manifest['dependencies'], null, true);

        wp_add_inline_script('sage/vendor.js', asset('scripts/manifest.js')->contents(), 'before');
    }
    wp_enqueue_script('sage/fontawesome.js', 'https://kit.fontawesome.com/033b65fee9.js', [], null, false);
    wp_enqueue_style('sage/editor-overrides.css', asset('styles/editor-overrides.css')->uri(), ['wp-edit-blocks', 'common'], null);
}, 100);

add_action('wp_print_styles', function () {
    wp_dequeue_style('wp-smart-crop-renderer'); // wp-smartcrop
    wp_dequeue_script('jquery.wp-smartcrop'); // wp-smartcrop
}, 100);

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
    /**
     * Enable plugins to manage the document title
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Register navigation menus
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage')
    ]);

    /**
     * Enable post thumbnails
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable responsive embeds
     * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/#responsive-embedded-content
     */
    add_theme_support('responsive-embeds');

    /**
     * Enable HTML5 markup support
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form', 'style', 'script']);

    /**
     * Enable selective refresh for widgets in customizer
     * @link https://developer.wordpress.org/themes/advanced-topics/customizer-api/#theme-support-in-sidebars
     */
    add_theme_support('customize-selective-refresh-widgets');

    add_image_size('tiny', 50, 50, true);

    // Enqueue editor styles
    add_editor_style('public/styles/gds.css');
    add_editor_style('public/styles/editor.css');
}, 20);

/**
 * Register the theme sidebars.
 *
 * @return void
 */
add_action('widgets_init', function () {
    $config = [
        'before_widget' => '<section class="widget %1$s %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h5 class="widget__title">',
        'after_title' => '</h5>'
    ];

    register_sidebar([
        'name' => __('Footer: Contact', 'sage'),
        'id' => 'footer-contact'
    ] + $config);

    register_sidebar([
        'name' => __('Footer: Social', 'sage'),
        'id' => 'footer-social'
    ] + $config);

    register_sidebar([
        'name' => __('Footer: Menu', 'sage'),
        'id' => 'footer-menu'
    ] + $config);

    register_sidebar([
        'name' => __('Footer: Newsletter', 'sage'),
        'id' => 'footer-newsletter'
    ] + $config);
});

/**
 * Disable broken error handler.
 * @see https://github.com/roots/acorn/issues/87
 */
add_action('after_setup_theme', function () {
    $previous_handler = set_error_handler(null);
});

<?php

/**
 * Theme setup.
 */

namespace App;

use GeneroWP\ImageResizer\Rewriters\InlineStyles;
use GeneroWP\ImageResizer\Rewriters\Urls;
use Spatie\GoogleFonts\GoogleFonts;
use WP_Theme_JSON_Data;

use function Roots\asset;
use function Roots\bundle;

/**
 * Register the theme assets.
 *
 * @return void
 */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('sage/app.js', asset('scripts/app.js')->uri(), [], null, true);
    wp_add_inline_script('sage/app.js', asset('runtime.js')->contents(), 'before');

    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    wp_enqueue_style('sage/app.css', asset('styles/app.css')->uri(), [], null);
    wp_style_add_data('sage/app.css', 'path', asset('styles/app.css')->path());
    // Print out global stylesheet in the <head>
    wp_add_inline_style('sage/app.css', wp_get_global_stylesheet());
}, 0);

add_action('wp_head', function () {
    echo app(GoogleFonts::class)->load()->toHtml();
}, 7);

/**
 * Register the theme assets with the block editor.
 *
 * @return void
 */
add_action('enqueue_block_editor_assets', function () {
    // Remove the editors reset stylesheet since it overrides h1, h2 etc selectors
    wp_deregister_style('wp-reset-editor-styles');
    wp_register_style('wp-reset-editor-styles', false);

    if ($bundle = bundle('scripts/editor')) {
        wp_enqueue_script('sage/editor.js', asset('scripts/editor.js')->uri(), $bundle->dependencies(), null, true);
        wp_add_inline_script('sage/editor.js', asset('runtime.js')->contents(), 'before');
    }
    wp_enqueue_style('sage/editor-overrides.css', asset('styles/editor-overrides.css')->uri(), ['wp-edit-blocks', 'common'], null);
    wp_enqueue_style('sage/googlefonts.css', app(GoogleFonts::class)->load()->url(), [], null);
}, 100);

/**
 * Remove some default global-styles set by core.
 */
add_filter('wp_theme_json_data_default', function (WP_Theme_JSON_Data $jsonData) {
    $data = $jsonData->get_data();
    unset($data['styles']['elements']['button']);
    unset($data['styles']['elements']['link']);

    $data['settings']['color']['palette']['default'] = [];
    $data['settings']['color']['duotone']['default'] = [];
    $data['settings']['color']['gradients']['default'] = [];
    $data['settings']['typography']['fontSizes']['default'] = [];
    $data['settings']['spacing']['spacingSizes']['default'] = [];
    $data['settings']['spacing']['spacingScale']['default'] = [];
    $data['settings']['shadow']['presets']['default'] = [];

    $jsonData = new WP_Theme_JSON_Data($data);

    return $jsonData;
}, 1000);

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
    /**
     * Enable plugins to manage the document title
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Register navigation menus
     *
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'gds'),
        'footer_navigation' => __('Footer Navigation', 'gds'),
    ]);

    /**
     * Enable post thumbnails
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable responsive embeds
     *
     * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/#responsive-embedded-content
     */
    add_theme_support('responsive-embeds');

    /**
     * Enable HTML5 markup support
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form', 'style', 'script']);

    /**
     * Enable selective refresh for widgets in customizer
     *
     * @link https://developer.wordpress.org/themes/advanced-topics/customizer-api/#theme-support-in-sidebars
     */
    add_theme_support('customize-selective-refresh-widgets');

    /**
     * Enable editor styles in block editor
     *
     * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#editor-styles
     */
    add_theme_support('editor-styles');

    remove_theme_support('core-block-patterns');

    add_image_size('tiny', 50, 50, true);

    $breakpoints = [
        50,
        ...range(100, 1000, 100),
        ...range(1000, 2000, 200),
    ];

    foreach ($breakpoints as $breakpoint) {
        add_image_size(sprintf('%dpx', $breakpoint), $breakpoint);
    }

    // Enqueue editor styles
    add_editor_style('public/styles/editor.css');
}, 20);

/**
 * Register the theme sidebars.
 *
 * @return void
 */
add_action('widgets_init', function () {
    $config = [
        'before_widget' => '',
        'after_widget' => '',
        'before_title' => '<h5 class="widget__title">',
        'after_title' => '</h5>',
    ];

    register_sidebar([
        'name' => __('Footer: Contact', 'gds'),
        'id' => 'footer-contact',
    ] + $config);

    register_sidebar([
        'name' => __('Footer: Social', 'gds'),
        'id' => 'footer-social',
    ] + $config);

    register_sidebar([
        'name' => __('Footer: Menu', 'gds'),
        'id' => 'footer-menu',
    ] + $config);

    register_sidebar([
        'name' => __('Footer: Newsletter', 'gds'),
        'id' => 'footer-newsletter',
    ] + $config);

    register_sidebar([
        'name' => __('Footer: Terms & conditions', 'gds'),
        'id' => 'footer-terms-conditions',
    ] + $config);
});

/**
 * Disable Image URL rewriters but keep other optimizations.
 */
add_filter('wp-image-resizer/rewriters', function (array $rewriters) {
    return array_diff($rewriters, [
        InlineStyles::class,
        Urls::class,
    ]);
});

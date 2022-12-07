<?php

/**
 * Theme setup.
 */

namespace App;

use Roots\Acorn\Assets\Contracts\Asset;
use WP_Theme_JSON_Data;

use function Roots\asset;

/**
 * Register the theme assets.
 *
 * @return void
 */
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('sage/app.js', asset('scripts/app.js')->uri(), [], null, true);
    wp_enqueue_script('sage/fontawesome.js', 'https://kit.fontawesome.com/d0d4c17dbd.js', [], null, false);

    wp_add_inline_script('sage/app.js', asset('scripts/manifest.js')->contents(), 'before');

    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    wp_enqueue_style('sage/fonts.css', 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap', [], null);
    wp_enqueue_style('sage/app.css', asset('styles/app.css')->uri(), [], null);
    // Print out global stylesheet in the <head>
    wp_add_inline_style('sage/app.css', wp_get_global_stylesheet());
}, 100);

/**
 * Always enqueue stylesheets for the following blocks in the <head>
 */
add_action('wp_enqueue_scripts', function () {
    render_block(['blockName' => 'core/heading']);
    render_block(['blockName' => 'core/paragraph']);

    // Enqeueue stylesheets of the firt block.
    if (is_singular() && $post = get_post()) {
        $blocks = parse_blocks($post->post_content);
        render_block($blocks[0]);
    }
}, 9);

/**
 * Register the theme assets with the block editor.
 *
 * @return void
 */
add_action('enqueue_block_editor_assets', function () {
    if ($manifest = asset('scripts/editor.asset.php')->load()) {
        wp_enqueue_script('sage/editor.js', asset('scripts/editor.js')->uri(), $manifest['dependencies'], null, true);

        wp_add_inline_script('sage/vendor.js', asset('scripts/manifest.js')->contents(), 'before');
    }
    wp_enqueue_script('sage/fontawesome.js', 'https://kit.fontawesome.com/033b65fee9.js', [], null, false);
    wp_enqueue_style('sage/fonts.css', 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap', [], null);
    wp_enqueue_style('sage/editor-overrides.css', asset('styles/editor-overrides.css')->uri(), ['wp-edit-blocks', 'common'], null);
}, 100);

/**
 * Remove some default global-styles set by core.
 */
add_filter('wp_theme_json_data_default', function (\WP_Theme_JSON_Data $jsonData) {
    $data = $jsonData->get_data();
    unset($data['styles']['elements']['button']);
    unset($data['styles']['elements']['link']);

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

    /**
     * Enable editor styles in block editor
     * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#editor-styles
     */
    add_theme_support('editor-styles');

    add_image_size('tiny', 50, 50, true);

    // Enqueue editor styles
    add_editor_style('public/styles/editor.css');

    // @see https://make.wordpress.org/core/2021/12/15/using-multiple-stylesheets-per-block/
    $manifest = config('assets.manifests.theme.assets');
    collect(json_decode(file_get_contents($manifest), true))
        ->keys()
        ->filter(fn ($file) => strpos($file, '/styles/blocks/') === 0)
        ->map(fn ($file) => asset($file))
        ->each(function (Asset $asset) {
            $filename = pathinfo(basename($asset->path()), PATHINFO_FILENAME);
            [$collection, $blockName] = explode('-', $filename, 2);
            wp_enqueue_block_style("$collection/$blockName", [
                'handle' => "sage/block/$filename",
                'src' => $asset->uri(),
                'path' => $asset->path(),
            ]);
        });
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

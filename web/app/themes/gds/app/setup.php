<?php

/**
 * Theme setup.
 */

namespace App;

use GeneroWP\ImageResizer\Rewriters\InlineStyles;
use GeneroWP\ImageResizer\Rewriters\Urls;
use Spatie\GoogleFonts\GoogleFonts;
use WP_Theme_JSON_Data;

/**
 * Register the theme assets.
 *
 * @return void
 */
add_action('wp_enqueue_scripts', function () {
    $appJs = Assets::asset('app.js');
    wp_enqueue_script('sage/app.js', $appJs->uri(), $appJs->dependencies(), $appJs->version(), true);

    if (is_single() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    $css = Assets::asset('app-styles.css');
    wp_enqueue_style('sage/app.css', $css->uri(), [], $css->version());
    wp_style_add_data('sage/app.css', 'path', $css->path());
}, 0);

// With `should_load_separate_core_block_assets=true` on a classic theme, core's
// wp_enqueue_global_styles() bails without registering the `global-styles` handle.
// WP 6.9.1 added stricter dep validation, and core still declares `global-styles`
// as a dep of `block-style-variation-styles`, which fires _doing_it_wrong.
// Register and enqueue the handle ourselves to satisfy the dep and print the
// global stylesheet in the <head>.
add_action('wp_enqueue_scripts', function () {
    if (! wp_style_is('global-styles', 'registered')) {
        wp_register_style('global-styles', false);
        wp_add_inline_style('global-styles', wp_get_global_stylesheet());
        wp_enqueue_style('global-styles');
    }
}, 1);

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

    $editor = Assets::asset('editor.js');
    wp_enqueue_script('sage/editor.js', $editor->uri(), $editor->dependencies(), $editor->version(), true);
    wp_set_script_translations('sage/editor.js', 'gds', get_parent_theme_file_path('resources/lang'));
}, 100);

/**
 * Serve the theme's JS translations to every script that asks for the `gds`
 * domain: the editor bundle, each block's editorScript (registered from
 * block.json) and their lazy chunks. `wp i18n make-json` writes one file per
 * source file, hashed by that source path, which matches no built script, so
 * they are merged and handed to the first script printed. wp.i18n domains are
 * global, so the scripts after it share them; the rest get an empty set rather
 * than another copy. Only the editor needs them: no front-end script
 * translates anything.
 */
add_filter('pre_load_script_translations', function (?string $translations, $file, string $handle, string $domain): ?string {
    static $sent = false;
    if ($domain !== 'gds' || $translations !== null || ! is_admin()) {
        return $translations;
    }
    if ($sent) {
        return '{"locale_data":{"messages":{"":{}}}}';
    }
    $sent = true;

    $messages = [];
    foreach (glob(get_parent_theme_file_path('resources/lang/gds-'.determine_locale().'-*.json')) ?: [] as $json) {
        $data = json_decode((string) file_get_contents($json), true);
        $messages += $data['locale_data']['messages'] ?? [];
    }

    return $messages ? (string) wp_json_encode(['locale_data' => ['messages' => $messages]]) : null;
}, 10, 4);

add_action('enqueue_block_assets', function () {
    if (is_admin()) {
        wp_enqueue_style('sage/googlefonts.css', app(GoogleFonts::class)->load()->url(), [], null);
        $editorOverrides = Assets::asset('editor-overrides.css');
        wp_enqueue_style('sage/editor-overrides.css', $editorOverrides->uri(), [], $editorOverrides->version());
    }
});

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
     * Load theme translations.
     */
    load_theme_textdomain('gds', get_parent_theme_file_path('resources/lang'));

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

    /**
     * Enable custom logo support
     *
     * @link https://developer.wordpress.org/themes/functionality/custom-logo/
     */
    add_theme_support('custom-logo');

    /**
     * Allow template parts
     *
     * @link https://make.wordpress.org/core/2022/10/04/block-based-template-parts-in-traditional-themes/
     */
    add_theme_support('block-template-parts');

    /**
     * Allow block templates where the theme ships one (templates/), so far
     * only product pages. Every other page keeps its Blade view: core uses a
     * block template only when it matches at least as specifically as the PHP
     * template.
     *
     * @link https://developer.wordpress.org/reference/functions/locate_block_template/
     */
    add_theme_support('block-templates');

    /**
     * Pages have an excerpt, used by teasers and as the meta description
     * fallback. Custom post types each get their own gds-{slug} mu-plugin
     * (see the /new-cpt skill).
     */
    add_post_type_support('page', 'excerpt');

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
    add_editor_style('build/editor-styles.css');
}, 20);

add_action('init', function () {
    register_block_pattern_category('hero', ['label' => __('Hero', 'gds')]);
    register_block_pattern_category('sections', ['label' => __('Sections', 'gds')]);
    register_block_pattern_category('cards', ['label' => __('Cards', 'gds')]);
    register_block_pattern_category('ctas', ['label' => __('CTAs', 'gds')]);
    register_block_pattern_category('listings', ['label' => __('Listings', 'gds')]);
});

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

<?php

/**
 * Theme filters.
 */

namespace App;

/**
 * Remove Read more to the excerpt.
 *
 * @return string
 */
add_filter('excerpt_more', function () {
    return '';
});

/**
 * Strip archive title prefix
 */
add_filter('get_the_archive_title', function ($title) {
    if (is_category()) {
        return single_cat_title('', false);
    } elseif (is_tag()) {
        return single_tag_title('', false);
    } elseif (is_author()) {
        return '<span class="vcard">'.get_the_author().'</span>';
    } elseif (is_tax()) {
        return single_term_title('', false);
    } elseif (is_post_type_archive()) {
        return post_type_archive_title('', false);
    }

    return $title;
});

/**
 * Support inline SVG in HTML.
 */
add_filter('wp_kses_allowed_html', function (array $tags) {
    $tags['svg'] = [
        'xmlns' => [],
        'fill' => [],
        'viewbox' => [],
        'role' => [],
        'aria-hidden' => [],
        'focusable' => [],
        'class' => [],
    ];
    $tags['path'] = [
        'd' => [],
        'fill' => [],
    ];
    $tags['toggle-button'] = [
        'class' => [],
        'aria-controls' => [],
        'aria-expanded' => [],
        'aria-haspopup' => [],
        'aria-label' => [],
        'data-label-open' => [],
        'data-label-close' => [],
        'persistent' => [],
        'role' => [],
        'tabindex' => [],
    ];

    return $tags;
}, 10, 2);

/**
 * Disable gravityforms styling.
 */
add_filter('gform_disable_css', '__return_true');

/**
 * Keep Cookiebot's auto-blocking away from script modules and the import map.
 * Before consent it rewrites them, which breaks the Interactivity API: the
 * accordion's toggle finds no item ("reading 'isOpen'") and never opens.
 * These are WordPress's and the theme's own scripts, not tracking.
 */
add_filter('wp_script_attributes', $cookiebotIgnoreModules = function (array $attributes): array {
    if (in_array($attributes['type'] ?? null, ['module', 'importmap'], true)) {
        $attributes['data-cookieconsent'] = 'ignore';
    }

    return $attributes;
});
add_filter('wp_inline_script_attributes', $cookiebotIgnoreModules);

/**
 * Since WordPress 6.9 core dequeues the assets a block enqueued while
 * rendering when it rendered nothing. Keep them: a wrapper's stylesheet often
 * styles children that render on their own (luotokoti's people listing lost
 * its styles this way).
 */
add_filter('enqueue_empty_block_content_assets', '__return_true');

/**
 * Limit Media & Text alignment to content width and wide only.
 */
add_filter('register_block_type_args', function (array $args, string $blockType): array {
    if ($blockType === 'core/media-text') {
        $args['supports']['align'] = ['wide'];
    }

    return $args;
}, 10, 2);

/**
 * Temporary, until Acorn supports block templates in a classic theme.
 *
 * Acorn puts every Blade view ahead of core's template names unless the theme
 * is a block theme, so core never matches templates/single-product.html, and
 * it wraps whatever template is chosen in index.php, which would nest
 * template-canvas.php's document inside ours
 * (Roots\Acorn\Sage\Concerns\FiltersTemplates).
 */
add_filter('single_template_hierarchy', function (array $templates): array {
    if (! is_singular('product')) {
        return $templates;
    }

    $product = get_queried_object();

    return ["single-product-{$product->post_name}.php", 'single-product.php', ...$templates];
}, 11);

add_filter('template_include', function (string $template): string {
    return empty($GLOBALS['_wp_current_template_id']) ? $template : ABSPATH.WPINC.'/template-canvas.php';
}, 101);

/**
 * A block template renders its blocks before wp_head, so block style
 * variations enqueue in the head, depending on `global-styles`. In a classic
 * theme core only registers that handle in the footer (and hoists it into the
 * head from there), so the head fails dependency validation. Register it
 * early on block-template pages only; Blade pages are left to core.
 */
add_action('wp_enqueue_scripts', function () {
    if (empty($GLOBALS['_wp_current_template_id']) || wp_style_is('global-styles', 'registered')) {
        return;
    }

    wp_register_style('global-styles', false);
    wp_add_inline_style('global-styles', wp_get_global_stylesheet());
    wp_enqueue_style('global-styles');
}, 1);

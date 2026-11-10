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
 * Use aria roles for heading in footer widgets in an attempt to improve SEO.
 */
add_filter('widget_block_content', function (string $content) {
    $content = str_replace(['<h2 ', '</h2>'], ['<p role="heading" aria-level="2" ', '</p>'], $content);

    return $content;
}, 11);

/**
 * Since WordPress 6.9 core dequeues the assets a block enqueued while
 * rendering when it rendered nothing. Keep them: a wrapper's stylesheet often
 * styles children that render on their own (luotokoti's people listing lost
 * its styles this way).
 */
add_filter('enqueue_empty_block_content_assets', '__return_true');

/**
 * Give every Query Loop a deterministic tiebreaker.
 *
 * Ordering by date alone leaves posts published in the same second in whatever
 * order MySQL happens to return them, so the same listing renders in a
 * different order between requests: cards swap places, page caches store
 * whichever order was rendered first, and visual regression tests compare a
 * page against a reshuffled copy of itself.
 */
add_filter('query_loop_block_query_vars', function (array $query): array {
    if (($query['orderby'] ?? 'date') !== 'date') {
        return $query;
    }

    $order = $query['order'] ?? 'DESC';
    $query['orderby'] = ['date' => $order, 'ID' => $order];

    return $query;
});

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
 * Product pages render templates/single-product.html. WooCommerce only looks
 * for its own registered block templates, which exist in block themes alone,
 * and otherwise swaps in its PHP template; tell it the theme has one.
 */
add_filter('woocommerce_has_block_template', function (bool $hasTemplate, string $templateName): bool {
    return $templateName === 'single-product' ? true : $hasTemplate;
}, 10, 2);

/**
 * Edit products inside their template, so editors see the whole page and
 * click into the description. Core hides the "Show template" toggle outside
 * block themes, but honours the post type's default mode.
 */
add_action('init', function () {
    add_post_type_support('product', 'editor', ['default-mode' => 'template-locked']);
}, 20);

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

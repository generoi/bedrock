<?php

/**
 * Theme filters.
 */

namespace App;

use WP_Site_Health;

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
 * Hide menu items linking to non-public posts (drafts, pending, trash)
 * unless the current user can edit that post.
 */
add_filter('wp_get_nav_menu_items', function ($items) {
    if (! is_array($items)) {
        return $items;
    }

    $hiddenStatuses = ['draft', 'pending', 'auto-draft', 'trash'];

    return array_values(array_filter($items, function ($item) use ($hiddenStatuses) {
        if ($item->type !== 'post_type' || empty($item->object_id)) {
            return true;
        }

        $status = get_post_status((int) $item->object_id);

        if (! in_array($status, $hiddenStatuses, true)) {
            return true;
        }

        return current_user_can('edit_post', (int) $item->object_id);
    }));
});

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
 * Fix WP 6.9 site health crashes caused by Acorn converting PHP warnings to
 * exceptions. Both issues occur when plugin/core data is missing required keys.
 */
add_filter('debug_information', function (array $info) {
    foreach ($info as &$section) {
        if (empty($section['fields'])) {
            continue;
        }
        foreach ($section['fields'] as $key => &$field) {
            if (! is_array($field)) {
                continue;
            }
            $field['value'] = $field['value'] ?? '';
            $field['label'] = $field['label'] ?? $key;
        }
    }

    return $info;
}, PHP_INT_MAX);

add_filter('site_status_tests', function (array $tests) {
    if (! isset($tests['direct']['php_version'])) {
        return $tests;
    }

    $tests['direct']['php_version']['test'] = function () {
        $response = wp_check_php_version();

        $result = [
            'label' => sprintf(__('Your site is running PHP %s'), PHP_VERSION),
            'status' => 'good',
            'badge' => ['label' => __('Performance'), 'color' => 'blue'],
            'description' => sprintf('<p>%s</p>', __('PHP is one of the programming languages used to build WordPress. Newer versions of PHP receive regular security updates and may increase your site&#8217;s performance.')),
            'actions' => sprintf(
                '<p><a href="%s" target="_blank">%s<span class="screen-reader-text"> %s</span><span aria-hidden="true" class="dashicons dashicons-external"></span></a></p>',
                esc_url(wp_get_update_php_url()),
                __('Learn more about updating PHP'),
                __('(opens in a new tab)')
            ),
            'test' => 'php_version',
        ];

        if (! $response) {
            $result['status'] = 'recommended';
            $result['description'] = '<p><em>'.sprintf(
                __('Unable to access the WordPress.org API for <a href="%s">Serve Happy</a>.'),
                'https://codex.wordpress.org/WordPress.org_API#Serve_Happy'
            ).'</em></p>'.$result['description'];

            return $result;
        }

        // recommended_version absent means current PHP is above the API's known range.
        if (! isset($response['recommended_version'])) {
            $result['label'] = sprintf(__('Your site is running a recommended version of PHP (%s)'), PHP_VERSION);

            return $result;
        }

        // Delegate to core now that we know recommended_version exists.
        return WP_Site_Health::get_instance()->get_test_php_version();
    };

    return $tests;
});

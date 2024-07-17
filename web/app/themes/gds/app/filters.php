<?php

/**
 * Theme filters.
 */

namespace App;

use WP_Block;

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
        return '<span class="vcard">' . get_the_author() . '</span>' ;
    } elseif (is_tax()) {
        return single_term_title('', false);
    } elseif (is_post_type_archive()) {
        return post_type_archive_title('', false);
    }
    return $title;
});

/**
 * Support `include` in query loop block (used by handpicked-posts filter).
 */
add_filter('query_loop_block_query_vars', function (array $query, WP_Block $block) {
    if (! empty($block->context['query']['include'])) {
        $query['post__in'] = $block->context['query']['include'];
    }
    return $query;
}, 10, 2);

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
        'class' => []
    ];
    $tags['path'] = [
        'd' => [],
        'fill' => [],
    ];
    return $tags;
}, 10, 2);

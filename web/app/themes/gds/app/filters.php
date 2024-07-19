<?php

/**
 * Theme filters.
 */

namespace App;

use WP_Block;
use WP_HTML_Tag_Processor;

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


/**
 * Use video featured images as poster images.
 */
add_filter('render_block', function (string $content, array $block) {
    $attachmentId = null;

    switch ($block['blockName']) {
        case 'core/cover':
            $backgroundType = $block['attrs']['backgroundType'] ?? null;
            if ($backgroundType === 'video') {
                $attachmentId = $block['attrs']['id'] ?? null;
            }
            break;
        case 'core/video':
            $attachmentId = $block['attrs']['id'] ?? null;
            break;
    }

    if ($attachmentId) {
        $posterImage = get_the_post_thumbnail_url($attachmentId, 'large');
        if ($posterImage ?? null) {
            $processor = new WP_HTML_Tag_Processor($content);
            while ($processor->next_tag()) {
                if ($processor->get_attribute('poster')) {
                    continue;
                }
                $processor->set_attribute('poster', $posterImage);
            }
            $content = $processor->get_updated_html();
        }
    }

    return $content;
}, 10, 2);

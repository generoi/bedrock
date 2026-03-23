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
        return '<span class="vcard">'.get_the_author().'</span>';
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
        $query['orderby'] = 'post__in';
        $query['order'] = 'DESC';
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
        'class' => [],
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
            while ($processor->next_tag('video')) {
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

/**
 * Add a variable exposing the column count so that we can use it in css for
 * responsive wrapping.
 */
add_filter('render_block_core/group', function (string $content, array $block) {
    $layoutType = $block['attrs']['layout']['type'] ?? null;
    $columnCount = $block['attrs']['layout']['columnCount'] ?? null;
    if ($layoutType === 'grid' && $columnCount) {
        $processor = new WP_HTML_Tag_Processor($content);
        $processor->next_tag('div');
        $processor->set_attribute('style', sprintf('--grid-columns: %d', $columnCount));
        $content = $processor->get_updated_html();
    }

    return $content;
}, 10, 2);

/**
 * Set default attributes for gravityforms block.
 */
add_filter('gform_form_block_attributes', function (array $attributes) {
    $attributes['ajax']['default'] = true;

    return $attributes;
});

add_filter('render_block_data', function (array $parsedBlock) {
    if ($parsedBlock['blockName'] === 'gravityforms/form') {
        if (! isset($parsedBlock['attrs']['ajax'])) {
            $parsedBlock['attrs']['ajax'] = true;
        }
    }

    return $parsedBlock;
});

/**
 * Disable gravityforms styling.
 */
add_filter('gform_disable_css', '__return_true');

/**
 * Separators should be decorative.
 */
add_filter('render_block_core/separator', function (string $content) {
    $content = str_replace('<hr ', '<hr aria-hidden="true" ', $content);

    return $content;
});

/**
 * Fix accessibility issues with inlined SVGs.
 */
add_filter('safe_svg_inline_markup', function (string $markup) {
    $processor = new WP_HTML_Tag_Processor($markup);
    $processor->next_tag('svg');

    // SVGs should be images so their content isnt read out
    if (! $processor->get_attribute('role')) {
        $processor->set_attribute('role', 'img');
    }

    if (! str_contains($markup, '<title')) {
        $processor->set_attribute('aria-hidden', 'true');
    }

    return $processor->get_updated_html();
});

/**
 * Use aria roles for heading in footer widgets in an attempt to improve SEO.
 */
add_filter('widget_block_content', function (string $content) {
    $content = str_replace(['<h2 ', '</h2>'], ['<p role="heading" aria-level="2" ', '</p>'], $content);

    return $content;
}, 11);

/**
 * Add a data attribute for block namespaces so that they can be used for styling.
 */
add_filter('render_block', function (string $content, array $block) {
    $namespace = $block['attrs']['namespace'] ?? null;

    if ($namespace) {
        $processor = new WP_HTML_Tag_Processor($content);
        $processor->next_tag();
        $processor->set_attribute('data-namespace', $namespace);
        $content = $processor->get_updated_html();
    }

    return $content;
}, 10, 2);

/**
 * Autoplay media & text videos.
 */
add_filter('render_block', function ($content, $block) {
    if ($block['blockName'] === 'core/media-text') {
        $processor = new WP_HTML_Tag_Processor($content);

        if ($processor->next_tag('video')) {
            $processor->set_attribute('autoplay', 'true');
            $processor->set_attribute('muted', 'true');
            $processor->set_attribute('playsinline', 'true');
            $processor->set_attribute('loop', 'true');
            $processor->remove_attribute('controls');
            $content = $processor->get_updated_html();
        }
    }

    return $content;
}, 10, 2);

/**
 * Add role="home" and aria-label to site logo.
 */
add_filter('render_block_core/site-logo', function (string $content) {
    $processor = new WP_HTML_Tag_Processor($content);

    if ($processor->next_tag('a')) {
        $processor->set_attribute('rel', 'home');
        $processor->set_attribute(
            'aria-label',
            /* translators: %s is replaced with the name of the site */
            sprintf(__('%s frontpage', 'gds'), get_bloginfo('name', 'display'))
        );
    }

    if ($processor->next_tag('img')) {
        $processor->set_attribute('aria-hidden', 'true');
        $processor->set_attribute('alt', '');
    }

    return $processor->get_updated_html();
});

/**
 * Optimize images in blocks.
 */
add_filter('render_block', function (string $content, array $block) {
    switch ($block['blockName']) {
        case 'core/media-text':
            $focalPoint = $block['attrs']['focalPoint'] ?? null;
            $mediaWidth = $block['attrs']['mediaWidth'] ?? 50;
            // We hide the background image use the <img> with objet-fit: contain, but need the position.
            if ($focalPoint) {
                $style = sprintf('object-position: %s%% %s%%;', $focalPoint['x'] * 100, $focalPoint['y'] * 100);
                $content = preg_replace('/^(\s*<div[^>]+>\s*<figure[^>]+>\s*<img )/', sprintf('$1style="%s" ', $style), $content);
            }
            // Calculate the sizes based on media width.
            if ($mediaWidth) {
                $sizes = sprintf('(min-width: 600px) %svw, (min-width: 1230px) %spx, 100vw', $mediaWidth, 1200 * ($mediaWidth / 100));
                $content = preg_replace('/^(\s*<div[^>]+>\s*<figure[^>]+>\s*<img )/', sprintf('$1sizes="%s" ', $sizes), $content);
            }
            break;
    }

    return $content;
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

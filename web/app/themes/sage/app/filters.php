<?php

/**
 * @file
 * Contains markup filters, among other things to modify output to use
 * Foundation classes.
 */

namespace App;

/**
 * Fix gutenberg integration.
 */
add_filter('the_content', function ($content) {
    if (strpos($content, '<!-- wp:core') !== false) {
        remove_filter('the_content', 'wpautop');
    }
    return $content;
}, 8);

/**
 * Remove leading and trailing whitespace.
 */
add_filter('the_content', function ($content) {
    // @see https://stackoverflow.com/a/22004695/319855
    $whitespace = '<br\s*/?>|\s|&nbsp;|<p>&nbsp;</p>';
    $content = preg_replace('#^(' . $whitespace . ')*(.+?)(' . $whitespace . ')*$#s', '$2', $content);
    return trim($content);
});

/**
 * Add <body> classes
 */
add_filter('body_class', function (array $classes) {
    /** Add page slug if it doesn't exist */
    if (is_single() || is_page() && !is_front_page()) {
        if (!in_array(basename(get_permalink()), $classes)) {
            $classes[] = basename(get_permalink());
        }
    }

    /** Add class if sidebar is active */
    if (display_sidebar()) {
        $classes[] = 'sidebar-primary';
    }

    /** Clean up class names for custom templates */
    $classes = array_map(function ($class) {
        return preg_replace(['/-blade(-php)?$/', '/^page-template-views/'], '', $class);
    }, $classes);

    /** Rename archive body class as it's the same as the archive content template. */
    if (($key = array_search('archive', $classes)) !== false) {
        $classes[$key] = 'archive-page';
    }

    return array_filter($classes);
});

/**
 * Add "… Continued" to the excerpt
 */
add_filter('excerpt_more', function () {
    return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', '<example-project>') . '</a>';
});

/**
 * Wrap oEmbeds in foundations responsive wrapper with minimal UI options.
 */
add_filter('embed_oembed_html', function ($cache, $url, $attr, $post_id) {
    preg_match('/src="([^"]*)"/i', $cache, $sources);
    if (!empty($sources)) {
        $src = $sources[1];
    }

    if (!empty($src) && !empty($url)) {
        $is_youtube = strpos($url, 'youtube') !== false;
        $is_vimeo = strpos($url, 'vimeo') !== false;
        if ($is_youtube) {
            $args = [
                'rel' => 0,
                'showinfo' => 0,
                'modestbranding' => 1,
            ];
        } elseif ($is_vimeo) {
            $args = [
                'title' => 0,
                'byline' => 0,
                'portrait' => 0,
                'controls' => 0,
                'hl' => Utils\langcode(),
                'iv_load_policy' => 3,
            ];
        }

        if (!empty($args) && ($parts = parse_url($url))) {
            $query = !empty($parts['query']) ? wp_parse_args($parts['query']) : [];
            // Override URL attributes with shortcode ones.
            $query = array_merge($query, $attr);
            // Add in defaults unless they are already defined.
            $query = array_merge($args, $query);
            // Force /embed endpoint for youtube.
            if ($is_youtube && $parts['path'] == '/watch') {
                $parts['path'] = '/embed/' . $query['v'];
                unset($query['v']);
            }
            if ($is_vimeo && is_numeric(substr($parts['path'], 1))) {
                $parts['host'] = 'player.vimeo.com';
                $parts['path'] = "/video{$parts['path']}";
            }
            // Use schemeless URL and re-build the query.
            $parts['scheme'] = null;
            $parts['query'] = build_query($query);
            // Rebuild the URL
            $url = Utils\build_url($parts);
            $cache = str_replace($src, $url, $cache);
        }
    }
    return '<div class="responsive-embed widescreen">' . $cache . '</div>';
}, 10, 4);

/**
 * Wrap iframes in foundations responsive wrappers.
 */
add_filter('the_content', function ($content) {
    preg_match_all('~(?!<div[^>]+class="[^"]*responsive-embed[^"]*">)<iframe.+?</iframe>~mi', $content, $matches);
    foreach ($matches[0] as $match) {
        if (strpos($match, 'youtube') || strpos($match, 'vimeo')) {
            $wrapped = '<div class="responsive-embed widescreen">' . $match . '</div>';
            $content = str_replace($match, $wrapped, $content);
        }
    }
    return $content;
}, 0);

/**
 * WP Gallery and Foundation integration.
 * @see https://developer.wordpress.org/reference/functions/gallery_shortcode/
 */
add_filter('post_gallery', function ($output, $attr, $instance) {
    $post = get_post();
    $atts = shortcode_atts([
        'order'      => 'ASC',
        'orderby'    => 'menu_order ID',
        'id'         => $post ? $post->ID : 0,
        'itemtag'    => 'figure',
        'icontag'    => 'div',
        'captiontag' => 'figcaption',
        'columns'    => 3,
        'size'       => 'thumbnail',
        'include'    => '',
        'exclude'    => '',
        'link'       => ''
    ], $attr, 'gallery');

    $id = intval($atts['id']);

    if (!empty($atts['include'])) {
        $_attachments = get_posts(['include' => $atts['include'], 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $atts['order'], 'orderby' => $atts['orderby']]);
        $attachments = [];
        foreach ($_attachments as $key => $val) {
            $attachments[$val->ID] = $_attachments[$key];
        }
    } elseif (!empty($atts['exclude'])) {
        $attachments = get_children(['post_parent' => $id, 'exclude' => $atts['exclude'], 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $atts['order'], 'orderby' => $atts['orderby']]);
    } else {
        $attachments = get_children(['post_parent' => $id, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $atts['order'], 'orderby' => $atts['orderby']]);
    }

    if (empty($attachments)) {
        return '';
    }

    if (is_feed()) {
        $output = "\n";
        foreach ($attachments as $att_id => $attachment) {
            $output .= wp_get_attachment_link($att_id, $atts['size'], true) . "\n";
        }
        return $output;
    }

    $itemtag = tag_escape($atts['itemtag']);
    $captiontag = tag_escape($atts['captiontag']);
    $icontag = tag_escape($atts['icontag']);
    $valid_tags = wp_kses_allowed_html('post');

    $columns = intval($atts['columns']);
    $itemwidth = $columns > 0 ? floor(100/$columns) : 100;
    $float = is_rtl() ? 'right' : 'left';

    $selector = "gallery-{$instance}";

    $size_class = sanitize_html_class($atts['size']);
    $grid_class = "grid-x grid-margin-x grid-margin-y small-up-1 medium-up-{$columns} align-center align-middle";
    $gallery_div = "<div id='$selector' class='gallery galleryid-{$id} {$grid_class}'>";
    $output = apply_filters('gallery_style', $gallery_div);

    $i = 0;
    foreach ($attachments as $id => $attachment) {
        $attr = (trim($attachment->post_excerpt)) ? ['aria-describedby' => "$selector-$id"] : '';
        if (!empty($atts['link']) && 'file' === $atts['link']) {
            $image_output = wp_get_attachment_link($id, $atts['size'], false, false, false, $attr);
        } elseif (!empty($atts['link']) && 'none' === $atts['link']) {
            $image_output = wp_get_attachment_image($id, $atts['size'], false, $attr);
        } else {
            $image_output = wp_get_attachment_link($id, $atts['size'], true, false, false, $attr);
        }
        $image_meta  = wp_get_attachment_metadata($id);
        $orientation = '';
        if (isset($image_meta['height'], $image_meta['width'])) {
            $orientation = ($image_meta['height'] > $image_meta['width']) ? 'portrait' : 'landscape';
        }
        $output .= "<{$itemtag} class='gallery-item cell'>";
        $output .= "<{$icontag} class='gallery-icon {$orientation}'>$image_output</{$icontag}>";
        if ($captiontag && trim($attachment->post_excerpt)) {
            $output .= "<{$captiontag} class='wp-caption-text gallery-caption' id='$selector-$id'>" . wptexturize($attachment->post_excerpt) . "</{$captiontag}>";
        }
        $output .= "</{$itemtag}>";
    }
    $output .= "</div>\n";
    return $output;
}, 10, 3);

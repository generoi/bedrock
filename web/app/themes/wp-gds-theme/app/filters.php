<?php

/**
 * Theme filters.
 */

namespace App;

use WP_Post;

/**
 * Remove Read more to the excerpt.
 *
 * @return string
 */
add_filter('excerpt_more', function () {
    return '';
});

/**
 * Load GDS as a module.
 */
add_filter('script_loader_tag', function (string $tag, string $handle) {
    if ($handle === 'sage/gds.js') {
        return str_replace(' src', ' type="module" src', $tag);
    }
    return $tag;
}, 10, 2);


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
 * Skip using WP Smartcrop JS feature and just set object-position directly.
 */
add_filter('wp_get_attachment_image_attributes', function (array $attr, WP_Post $attachment, $size) {
    $focus = smartcrop_focus($attachment->ID);

    if ($focus) {
        $attr['style'] = sprintf('object-position: %s%% %s%%;', $focus[0] ?: 0, $focus[1] ?: 0);
    }

    return $attr;
}, PHP_INT_MAX, 3);

/**
 * Rewrite youtube embeds so that their iframes are lazy loaded.
 */
add_filter('embed_oembed_html', function ($cache, $url, $attr, $post_id) {
    preg_match('/src="([^"]*)"/i', $cache, $match);
    $src = $match[1] ?? null;
    if (!$src) {
        return $cache;
    }

    // @see https://gist.github.com/ghalusa/6c7f3a00fd2383e5ef33
    preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $src, $match);
    $youtubeId = $match[1] ?? null;
    if (!$youtubeId) {
        return $cache;
    }

    return view('partials.embed-youtube', [
        'youtube_id' => $youtubeId,
    ]);
}, 10, 4);

/**
 * Add "lazy" loading attribute to all images.
 */
add_filter('wp_get_attachment_image_attributes', function ($attr) {
    if (is_admin()) {
        return $attr;
    }
    $attr['loading'] = 'lazy';
    return $attr;
}, PHP_INT_MAX);

/**
 * Add "lazy" loading attribute to all images in content.
 */
add_filter('wp_content_img_tag', function ($filteredImage, $context, $attachmentId) {
    if (!str_contains($filteredImage, 'loading="')) {
        $filteredImage = str_replace('<img ', '<img loading="lazy" ', $filteredImage);
    }

    return $filteredImage;
}, 10, 3);

/**
 * Lazy load all iframes and videos
 */
add_filter('the_content', function ($content) {
    $content = preg_replace('/(<iframe|<video)(.*?)src=\"(.*?)\"(.*?)>/i', '$1$2data-src="$3"$4>', $content);
    return $content;
});

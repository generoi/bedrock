<?php

/**
 * @file
 * Contains image size definitions and other image related filters.
 */

namespace App;

use Timber;

/**
 * Define image sizes
 */
add_action('after_setup_theme', function () {
    global $content_width;

    // Set the maximum allowed width for any content (eg. oEmbeds, images).
    // This should be the width of the content area.
    if (!isset($content_width)) {
        $content_width = intval(sage('foundation')->paragraphWidth('large'));
    }

    // Modify Core sizes.
    if (get_option('large_size_w') != $content_width) {
        update_option('thumbnail_size_w', 150);
        update_option('thumbnail_size_h', 150);
        update_option('thumbnail_crop', 1);
        update_option('medium_size_w', 300);
        update_option('medium_size_h', 300);
        // Desktop Version
        update_option('large_size_w', $content_width);
        update_option('large_size_h', round($content_width/1.5));
    }

    // Hero image sizes (wp-hero).
    add_image_size('hero--desktop', 1400, 500, 1);
    add_image_size('hero--tablet', 768, 400, 1);
    add_image_size('hero--mobile', 400, 350, 1);

    // Tablet version
    add_image_size('tablet', 768, 400);
    // Mobile version
    add_image_size('mobile', 400, 400);
    // Teaser image.
    add_image_size('teaser', 300, 150, 1);
});


/**
 * Expose our custom image sizes to the Admin UI.
 */
add_filter('image_size_names_choose', function ($sizes) {
    return array_merge($sizes, [
        'mobile' => __('Mobile', '<example-project>'),
        'tablet' => __('Tablet', '<example-project>'),
    ]);
});

/**
 * Remove all srcset sizes larger than the content width.
 */
add_filter('max_srcset_image_width', function () {
    global $content_width;
    return $content_width;
});

/**
 * Sort srcset according to sizes so it's be more readable.
 * @note by default Wordpress excludes images that have a different aspect ratio.
 */
add_filter('wp_calculate_image_srcset', function ($sources, $size_array, $image_src, $image_meta) {
    ksort($sources, SORT_NUMERIC);
    return $sources;
}, 10, 4);

/**
 * Tell Wordpress about the paragraph width in different viewport sizes.
 */
add_filter('wp_calculate_image_sizes', function ($sizes, $size) {
    $width = $size[0];
    $foundation = sage('foundation');

    if ($width >= $foundation->breakpoint('medium')) {
        $sizes = [];
        $sizes[] = '(max-width: ' . $foundation->breakpoint('medium') . 'px) ' . $foundation->paragraphWidth('small');
        $sizes[] = '(max-width: ' . $foundation->breakpoint('large') . 'px) ' . $foundation->paragraphWidth('medium');
        $sizes[] = $foundation->paragraphWidth('large');
        $sizes = implode(', ', $sizes);
    }
    return $sizes;
}, 10, 2);

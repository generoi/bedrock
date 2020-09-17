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

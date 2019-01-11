<?php

/**
 * @file
 * Contains custom Yoast placeholders.
 */

namespace App;

/**
 * Add custom placeholders to yoast.
 *
 * - %%term_parent_title%%
 */
add_filter('wpseo_replacements', function ($replacements) {
    if (is_tax() || is_category() || is_tag()) {
        $term = $GLOBALS['wp_query']->get_queried_object();
        if (isset($term->taxonomy)) {
            $taxonomy = $term->taxonomy;
            if ($term->parent != 0) {
                $parent = get_term($term->parent, $taxonomy);
                $replacements['%%term_parent_title%%'] = $parent->name;
            }
        }
    }
    return $replacements;
});

/**
 * Breacrumbs using Foundation markup.
 */
add_filter('wpseo_breadcrumb_separator', function ($separator) {
    return '';
});
add_filter('wpseo_breadcrumb_single_link_wrapper', function ($element) {
    return 'li';
});
add_filter('wpseo_breadcrumb_output_wrapper', function ($wrapper) {
    return 'ul';
});
add_filter('wpseo_breadcrumb_output_class', function ($class) {
    return 'breadcrumbs';
});
add_filter('wpseo_breadcrumb_single_link', function ($link_output, $link) {
    // The last non-link breadcrumb is inserted into the previous breadcrumb.
    if (strpos($link_output, 'breadcrumb_last') !== false) {
        $link_output = '</li><li>' . $link_output;
    }
    return $link_output;
}, 10, 2);

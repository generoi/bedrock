<?php

/**
 * @file
 * Contains permalink rewrites.
 */

namespace App;

/**
 * Replace %category_name% in URLs. with the first category term.
 * @example
 * blog/%category%/my-post -> blog/action/my-post
 */
add_filter('post_link', __NAMESPACE__ . '\\custom_post_permalinks', 10, 3);
add_filter('post_type_link', __NAMESPACE__ . '\\custom_post_permalinks', 10, 3);

function custom_post_permalinks($post_link, $post, $leavename)
{
    if (preg_match('/%([^%]+)%/', $post_link, $matches)) {
        list($replace, $category) = $matches;
        $terms = wp_get_post_terms($post->ID, $category);
        if ($terms && is_array($terms)) {
            Utils\sort_terms_hierarchicaly($terms);
            // Only get the first term.
            $term = array_pop($terms);
            $slug = $term->slug;
            // Append the entire hierarchy if available.
            while (!empty($term->children)) {
                $term = reset($term->children);
                $slug .= '-' . $term->slug;
            }
            $post_link = str_replace($replace, $slug, $post_link);
        }
    }
    return $post_link;
}

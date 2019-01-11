<?php

/**
 * @file
 * Contains utility functions.
 */

namespace App\Utils;

/**
 * Get the current absolute URL of the page.
 * @return string
 */
function current_url()
{
    global $wp;
    return home_url(add_query_arg([], $wp->request));
}


/**
 * Get the ISO language code.
 * @param string $locale
 * @return string
 */
function langcode($locale = null)
{
    if (!$locale) {
        $locale = get_locale();
    }
    return strstr($locale, '_', true) ?? $locale;
}

/**
 * Format a phone number according to finnish system. Not perfect.
 * @param string $number
 * @return string
 */
function format_phone($number)
{
    // Remove all separators (except for parenthesis)
    $number = str_replace(['-', ' '], '', $number);
    // Format the ending numbers with spacing:
    // - 0407072916 -> 040 7072916
    // - 04007072916 -> 0400 7072916
    $number = preg_replace('|(\d{2,4})(\d{3})*(\d{4})$|', '$1 $2 $3', $number);
    // Format the spacing and the optional parenthesis:
    // +35840 -> +358 40
    // +358(0)40 -> +358 40
    $number = preg_replace('|^\+?358([\d])?(\(0\))?|', '+358 $1', $number);
    return $number;
}

/**
 * Build a URL string based on URL parts.
 * @see https://stackoverflow.com/a/35207936/319855
 *
 * @param array $parts Parts of the URL as returned by `parse_url`
 * @return string
 */
function build_url($parts)
{
    return (isset($parts['scheme']) ? "{$parts['scheme']}:" : '') .
        ((isset($parts['user']) || isset($parts['host'])) ? '//' : '') .
        (isset($parts['user']) ? "{$parts['user']}" : '') .
        (isset($parts['pass']) ? ":{$parts['pass']}" : '') .
        (isset($parts['user']) ? '@' : '') .
        (isset($parts['host']) ? "{$parts['host']}" : '') .
        (isset($parts['port']) ? ":{$parts['port']}" : '') .
        (isset($parts['path']) ? "{$parts['path']}" : '') .
        (isset($parts['query']) ? "?{$parts['query']}" : '') .
        (isset($parts['fragment']) ? "#{$parts['fragment']}" : '');
}

/**
 * Return the domain used for the upload directory. Useful if `upload_url_path`
 * is set to a subdomain.
 * @return string
 */
function get_upload_dir_domain()
{
    $upload_dir = wp_upload_dir();
    $parts = parse_url($upload_dir['url']);
    $url = $parts['scheme'] . '://' . $parts['host'];
    return $url;
}

/**
 * Sort a list of terms hierarchicaly  Child terms will be placed under the
 * `children` property.
 * @see http://wordpress.stackexchange.com/a/99516
 *
 * @param WP_Term[] $categories The term objects to sort
 * @param array $into Optional result array to put them into
 * @param int $parent_id The current parent ID to put them in
 * @return void
 */
function sort_terms_hierarchicaly(&$categories, &$into = null, $parent_id = 0)
{
    $has_target = isset($into);
    if (!$has_target) {
        $into = [];
    }
    foreach ($categories as $i => $cat) {
        if ($cat->parent == $parent_id) {
            $into[$cat->term_id] = $cat;
            unset($categories[$i]);
        }
    }
    foreach ($into as $top_cat) {
        $top_cat->children = array();
        sort_terms_hierarchicaly($categories, $top_cat->children, $top_cat->term_id);
    }
    if (!$has_target) {
        $categories = $into;
    }
}

/**
 * Return the first value found by looking hierarchicaly through an array or
 * object tree.
 *
 * @example
 * $terms = $this->get_terms('product_cat');
 * Utils\sort_terms_hierarchicaly($terms);
 * if ($terms) {
 *     return Utils\get_value_hierarchicaly('product_description', reset($terms));
 * }
 *
 * @param string $field The property/attribute to retrieve
 * @param string $hierarchy Hierarchicaly sorted list if objects to search in
 * @param string $child_proeprty Property where child objects are accessed.
 * @return mixed
 */
function get_value_hierarchicaly($field, $hierarchy, $child_property = 'children')
{
    $found = null;
    if (is_array($hierarchy)) {
        if (!empty($hierarchy[$field])) {
            $found = $hierarchy[$field];
        }
        if (!empty($hierarchy[$child_property])) {
            foreach ($hierarchy[$child_property] as $child) {
                $child_value = get_value_hierarchicaly($field, $child);
                if (!empty($child_value)) {
                    $found = $child_value;
                }
            }
        }
    } elseif (is_object($hierarchy)) {
        if (!empty($hierarchy->$field)) {
            $found = $hierarchy->$field;
        }
        if (!empty($hierarchy->$child_property)) {
            foreach ($hierarchy->$child_property as $child) {
                $child_value = get_value_hierarchicaly($field, $child);
                if (!empty($child_value)) {
                    $found = $child_value;
                }
            }
        }
    }
    return $found;
}

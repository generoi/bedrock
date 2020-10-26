<?php

/*
Plugin Name:  Stop User Enumeration
Plugin URI:   https://genero.fi
Description:  Do not allow user enumeration using WP pretty URLs.
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

if (!is_blog_installed()) {
    return;
}

add_action('init', function () {
    if (is_admin()) {
        return;
    }

    if (!preg_match('/author=([0-9]*)/i', $_SERVER['QUERY_STRING'] ?? '')) {
        return;
    }

    add_filter('query_vars', function (array $query_vars) {
        foreach (['author', 'author_name'] as $var) {
            $key = array_search($var, $query_vars);
            if ($key !== false) {
                unset($query_vars[$key]);
            }
        }
        return $query_vars;
    });
});

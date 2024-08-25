<?php

/*
Plugin Name:  Prevent User Enumeration
Plugin URI:   https://genero.fi
Description:  Do not allow user enumeration using WP pretty URLs.
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

use WP_Error;

if (! is_blog_installed()) {
    return;
}

add_action('init', function () {
    if (is_admin()) {
        return;
    }

    if (! preg_match('/author=([0-9]*)/i', $_SERVER['QUERY_STRING'] ?? '')) {
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

/**
 * Do not reveal if username exists when a login fails.
 */
add_filter('login_errors', function ($message) {
    global $errors;

    if (isset($errors->errors['invalid_username']) || isset($errors->errors['incorrect_password'])) {
        $message = sprintf(
            __('<strong>ERROR</strong>: Invalid username/password combination. <a href="%1$s" title="%2$s">%3$s</a>?'),
            site_url('wp-login.php?action=lostpassword', 'login'),
            __('Password Lost and Found', 'default'),
            __('Lost Password', 'default')
        );
    }

    return $message;
});

/**
 * Do not reveal if username exists when using lost password feature.
 */
add_action('lost_password', function (WP_Error $errors) {
    // Always redirect even if there are errors.
    if ($errors->has_errors()) {
        $redirect_to = ! empty($_REQUEST['redirect_to']) ? $_REQUEST['redirect_to'] : 'wp-login.php?checkemail=confirm';
        wp_safe_redirect($redirect_to);
    }
});

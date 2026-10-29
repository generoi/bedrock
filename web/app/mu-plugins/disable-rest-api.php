<?php

/*
Plugin Name:  Disable REST API
Plugin URI:   https://genero.fi
Description:  Disable REST API
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

remove_action('template_redirect', 'rest_output_link_header', 11);
remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('xmlrpc_rsd_apis', 'rest_output_rsd');

/*
 * Priority 101 runs after core's application password (90) and cookie (100)
 * handlers. A request carrying a valid wordpress_logged_in cookie but no
 * X-WP-Nonce is is_user_logged_in() === true until rest_cookie_check_errors
 * calls wp_set_current_user(0) at priority 100; run earlier, this check would
 * wave that request through, and it would then reach a closed route as an
 * anonymous caller.
 *
 * @see rest_application_password_check_errors() and rest_cookie_check_errors()
 */
add_filter('rest_authentication_errors', function ($access) {
    // @see https://github.com/WordPress/wordpress-develop/blob/b316c8b25fc71920d89ee37ee26609a77b2a305a/src/wp-includes/rest-api.php#L390
    $route = untrailingslashit($GLOBALS['wp']->query_vars['rest_route']) ?: '/';

    // Allow logged out users access to the following endpoints, prevent access
    // to others.
    if (preg_match('@^/(facetwp|gds|wc|wp-passkey)/@', $route)) {
        return $access;
    }

    if (! is_user_logged_in()) {
        $message = apply_filters('disable_wp_rest_api_error', __('REST API restricted to authenticated users.', 'disable-wp-rest-api'));

        return new WP_Error('rest_login_required', $message, ['status' => rest_authorization_required_code()]);
    }

    return $access;
}, 101);

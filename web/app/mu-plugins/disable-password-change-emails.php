<?php

/*
Plugin Name:  Disable Admin Notification of User Password Change
Plugin URI:   https://genero.fi
Description:  Various defaults for WP
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

if (! is_blog_installed()) {
    return;
}

/**
 * Disable Admin Notification of User Password Change
 *
 * @see pluggable.php
 */
if (! function_exists('wp_password_change_notification')) {
    function wp_password_change_notification($user) {}
}

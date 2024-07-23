<?php

/*
Plugin Name:  Disable Admin Email Notifications
Plugin URI:   https://genero.fi
Description:  Disable Admin Email Notifications on new user registration
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

use WP_Error;

if (!is_blog_installed()) {
    return;
}

function sendNewUserNotifications(int $userId, string $notify = 'both'): void
{
    if (empty($notify) || $notify === 'admin') {
        return;
    }

    if ($notify == 'both') {
        $notify = 'user';
    }

    wp_send_new_user_notifications($userId, $notify);
}

remove_action('register_new_user', 'wp_send_new_user_notifications');
remove_action('edit_user_created_user', 'wp_send_new_user_notifications');
add_action('register_new_user', __NAMESPACE__ . '\\sendNewUserNotifications');
add_action('edit_user_created_user', __NAMESPACE__ . '\\sendNewUserNotifications', 10, 2);

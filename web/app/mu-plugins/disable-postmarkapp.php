<?php

/*
Plugin Name:  Disable PostmarkApp outside production
Plugin URI:   https://genero.fi
Description:  Force the Postmark plugin off everywhere but production, so DDEV and staging (which run copies of the production database) never send real transactional email. With Postmark disabled, wp_mail falls through to PHP mail(), which DDEV captures in Mailpit.
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

if (! is_blog_installed()) {
    return;
}

// The Postmark plugin reads `postmark_settings` when it loads and, if enabled,
// overrides wp_mail to deliver through the Postmark API — bypassing Mailpit and
// sending real email to real customers from a developer's machine or from
// staging. This mu-plugin loads before regular plugins, so flipping `enabled`
// off here means Postmark never installs its wp_mail override there.
add_filter('option_postmark_settings', function ($settings) {
    if (wp_get_environment_type() === 'production') {
        return $settings;
    }

    $decoded = json_decode((string) $settings, true);
    if (! is_array($decoded)) {
        return $settings;
    }

    $decoded['enabled'] = 0;

    return wp_json_encode($decoded);
});

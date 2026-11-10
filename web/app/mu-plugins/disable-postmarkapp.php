<?php

/*
Plugin Name:  Disable PostmarkApp locally
Plugin URI:   https://genero.fi
Description:  Force the Postmark plugin off in DDEV so local/dev never sends real transactional email. With Postmark disabled, wp_mail falls through to PHP mail() which DDEV captures in Mailpit.
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
// sending real email straight from a developer's machine. This mu-plugin loads
// before regular plugins, so flipping `enabled` off here means Postmark never
// installs its wp_mail override in DDEV.
add_filter('option_postmark_settings', function ($settings) {
    if (! env('IS_DDEV_PROJECT')) {
        return $settings;
    }

    $decoded = json_decode((string) $settings, true);
    if (! is_array($decoded)) {
        return $settings;
    }

    $decoded['enabled'] = 0;

    return wp_json_encode($decoded);
});

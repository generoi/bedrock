<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Spatie\Csp\PolicyFactory;

class ContentSecurityPolicyServiceProvider extends ServiceProvider
{
    public function register()
    {
        add_action('send_headers', [$this, 'sendHeaders']);
        add_filter('wp_inline_script_attributes', [$this, 'addScriptNonce']);
        add_filter('wp_script_attributes', [$this, 'addScriptNonce']);
        add_action('wp_footer', [$this, 'removeWooCommerceNoJs'], 0);
    }

    public function sendHeaders(): void
    {
        if (! config('csp.enabled')) {
            return;
        }
        $policy = PolicyFactory::create(config('csp.policy'));

        // Force client-side TLS (Transport Layer Security) redirection.
        header('Strict-Transport-Security: max-age=63072000; includeSubDomains; preload');

        // Disable content sniffing, since it's an attack vector.
        header('X-Content-Type-Options: nosniff');

        // Prevent clickjacking
        header('X-Frame-Options: SAMEORIGIN');

        // Set a strict Referrer Policy to mitigate information leakage.
        header('Referrer-Policy: strict-origin-when-cross-origin');

        // Disable unused device permissions
        header('Permissions-Policy: accelerometer=(),autoplay=(self),camera=(),display-capture=(),encrypted-media=(),fullscreen=(*),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(self),usb=(),xr-spatial-tracking=()');

        // Add Content-Security-Policy
        header(sprintf('%s: %s', $policy->prepareHeader(), $policy->__toString()), true);
    }

    public function addScriptNonce(array $attributes): array
    {
        $attributes['nonce'] = csp_nonce();
        return $attributes;
    }

    /**
     * Currently there's no way to easily add a nonce here so we replace it.
     */
    public function removeWooCommerceNoJs(): void
    {
        remove_action('wp_footer', 'wc_no_js');
        add_action('wp_footer', function () {
            echo wp_get_inline_script_tag("
                (function () {
                    var c = document.body.className;
                    c = c.replace(/woocommerce-no-js/, 'woocommerce-js');
                    document.body.className = c;
                })();
            ");
        });
    }
}

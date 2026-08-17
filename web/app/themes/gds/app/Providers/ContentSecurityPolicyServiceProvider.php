<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Spatie\Csp\Policy;

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

        // wp-admin cannot work under a nonce. Core prints inline scripts that
        // never pass through `wp_inline_script_attributes` — `ajaxurl` in
        // admin-header.php among them — so they can never carry one, and a
        // nonce anywhere in script-src makes the browser ignore
        // 'unsafe-inline'. The result is `ajaxurl is not defined`.
        //
        // Spatie's Basic, GoogleAnalytics and GoogleTagManager presets add a
        // nonce unconditionally, so omitting it in App\Csp\WordPress is not
        // enough on its own. Turning the generator off covers every preset at
        // once, and admin keeps a real policy ('self' plus 'unsafe-inline').
        if (is_admin()) {
            config(['csp.nonce_enabled' => false]);
        }

        $policy = Policy::create(
            presets: config('csp.presets'),
            directives: config('csp.directives'),
            reportUri: config('csp.report_uri'),
        );

        // Force client-side TLS (Transport Layer Security) redirection.
        header('Strict-Transport-Security: max-age=63072000; includeSubDomains; preload');

        // Disable content sniffing, since it's an attack vector.
        header('X-Content-Type-Options: nosniff');

        // Prevent clickjacking
        header('X-Frame-Options: SAMEORIGIN');

        // Set a strict Referrer Policy to mitigate information leakage.
        header('Referrer-Policy: strict-origin-when-cross-origin');

        // Add Content-Security-Policy
        $header = config('csp.report_only')
            ? 'Content-Security-Policy-Report-Only'
            : 'Content-Security-Policy';

        header(sprintf('%s: %s', $header, $policy->getContents()), true);
    }

    public function addScriptNonce(array $attributes): array
    {
        $attributes['nonce'] = app('csp-nonce');

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

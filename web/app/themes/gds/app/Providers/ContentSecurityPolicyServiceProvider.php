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
        // This is the frontend policy; gds-security-hardening owns wp-admin's
        // and wp-login.php's, and sends the static security headers (HSTS,
        // nosniff, Referrer-Policy) everywhere. Admin list screens still reach
        // here, because wp_edit_posts_query() and wp_edit_attachments_query()
        // call wp(), which fires send_headers. Sending this policy there would
        // replace the admin one, and its nonce makes browsers ignore
        // 'unsafe-inline', blocking the inline scripts core and plugins print,
        // which can never carry a nonce.
        if (! config('csp.enabled') || is_admin()) {
            return;
        }

        $policy = Policy::create(
            presets: config('csp.presets'),
            directives: config('csp.directives'),
            reportUri: config('csp.report_uri'),
        );

        // Add Content-Security-Policy. Its frame-ancestors 'self'
        // (App\Csp\Security) is what prevents clickjacking.
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

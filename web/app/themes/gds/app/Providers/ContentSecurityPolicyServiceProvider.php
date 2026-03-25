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
    }

    public function sendHeaders(): void
    {
        if (! config('csp.enabled')) {
            return;
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
        header(sprintf('Content-Security-Policys: %s', $policy->getContents()), true);
    }

    public function addScriptNonce(array $attributes): array
    {
        $attributes['nonce'] = app('csp-nonce');

        return $attributes;
    }
}

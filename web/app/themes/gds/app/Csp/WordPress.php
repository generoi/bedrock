<?php

namespace App\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;
use Spatie\Csp\Scheme;
use Spatie\Csp\Value;

class WordPress implements Preset
{
    public function configure(Policy $policy): void
    {
        $policy
            // Gravityform AJAX requires iframes of itself
            ->add(Directive::FRAME, Keyword::SELF)
            // There's no filter for inline styles in WordPress.
            ->add(Directive::STYLE, Keyword::UNSAFE_INLINE)
            // Allow self hosted fonts
            ->add(Directive::FONT, Keyword::SELF)
            // Allow embedded base64 encoded fonts and images
            ->add(Directive::FONT, Scheme::DATA)
            ->add(Directive::IMG, Scheme::DATA)
            ->add(Directive::UPGRADE_INSECURE_REQUESTS, Value::NO_VALUE);

        // Propagate trust for scripts with a nonce. Frontend only: wp-admin's
        // policy is gds-security-hardening's.
        $policy->addNonce(Directive::SCRIPT);
        $policy->add(Directive::SCRIPT, [Keyword::STRICT_DYNAMIC, Keyword::UNSAFE_INLINE, 'https:']);

        // React development builds contain eval
        if (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG && wp_get_environment_type() === 'development') {
            $policy->add(Directive::SCRIPT, Keyword::UNSAFE_EVAL);
        }

        // WooCommerce variable products use underscore templates
        if (function_exists('is_product') && is_product() && wc_get_product()->is_type('variable')) {
            $policy->add(Directive::SCRIPT, Keyword::UNSAFE_EVAL);
        }
    }
}

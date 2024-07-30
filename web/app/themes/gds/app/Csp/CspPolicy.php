<?php

namespace App\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policies\Basic;
use Spatie\Csp\Value;

class CspPolicy extends Basic
{
    public const KEYWORD_DATA = 'data:';

    public function configure()
    {
        // Basics
        $this
            ->addDirective(Directive::BASE, Keyword::SELF)
            ->addDirective(Directive::CONNECT, Keyword::SELF)
            ->addDirective(Directive::DEFAULT, Keyword::SELF)
            ->addDirective(Directive::FORM_ACTION, Keyword::SELF)
            ->addDirective(Directive::IMG, Keyword::SELF)
            ->addDirective(Directive::MEDIA, Keyword::SELF)
            ->addDirective(Directive::OBJECT, Keyword::NONE)
            ->addDirective(Directive::SCRIPT, Keyword::SELF)
            ->addDirective(Directive::STYLE, Keyword::SELF)
            ->addDirective(Directive::STYLE, Keyword::SELF)
            // Prevent clickjacking by not allowing page to be embedded
            ->addDirective(Directive::FRAME_ANCESTORS, Keyword::SELF)
            // Gravityform AJAX requires iframes of itself
            ->addDirective(Directive::FRAME, Keyword::SELF)

            // There's no filter for inline styles in WordPress.
            ->addDirective(Directive::STYLE, Keyword::UNSAFE_INLINE)
            // Allow self hosted fonts
            ->addDirective(Directive::FONT, Keyword::SELF)
            // Allow embedded base64 encoded fonts and images
            ->addDirective(Directive::FONT, self::KEYWORD_DATA)
            ->addDirective(Directive::IMG, self::KEYWORD_DATA)
            ->addDirective(Directive::UPGRADE_INSECURE_REQUESTS, Value::NO_VALUE)
            // Google Tag Manager
            // @see https://developers.google.com/tag-platform/security/guides/csp
            ->addDirective(Directive::IMG, 'www.googletagmanager.com')
            ->addDirective(Directive::CONNECT, 'www.googletagmanager.com')
            // Google Tag Manager - Preview
            ->addDirective(Directive::STYLE, ['https://googletagmanager.com', 'https://www.googletagmanager.com', 'https://tagmanager.google.com', 'https://fonts.googleapis.com'])
            ->addDirective(Directive::IMG, ['https://googletagmanager.com', 'https://ssl.gstatic.com', 'https://www.gstatic.com', 'https://fonts.gstatic.com'])
            ->addDirective(Directive::FONT, ['https://fonts.gstatic.com', self::KEYWORD_DATA])
            // Google Analytics 4
            ->addDirective(Directive::IMG, ['https://*.google-analytics.com', 'https://*.googletagmanager.com'])
            ->addDirective(Directive::CONNECT, ['https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://*.googletagmanager.com'])
            // // Google Ads conversions
            ->addDirective(Directive::IMG, ['https://googleads.g.doubleclick.net', 'https://www.google.com', 'https://google.com'])
            ->addDirective(Directive::FRAME, ['https://www.googletagmanager.com'])
            // // Google Ads remarketing
            ->addDirective(Directive::IMG, ['https://www.google.com', 'https://google.com'])
            ->addDirective(Directive::FRAME, ['https://bid.g.doubleclick.net', 'https://td.doubleclick.net'])
            // Facebook Pixel
            ->addDirective(Directive::FORM_ACTION, ['https://www.facebook.com'])
            ->addDirective(Directive::FRAME, ['https://www.facebook.com'])
            ->addDirective(Directive::IMG, ['https://www.facebook.com']);

        // Custom
        $this
            ->addDirective(Directive::FRAME, ['player.vimeo.com', 'www.youtube.com'])
            ->addDirective(Directive::MEDIA, 'samplelib.com')
            ->addDirective(Directive::IMG, [
                'cldup.com',
                'img.youtube.com',
                'i.ytimg.com',
                'i.vimeocdn.com',
            ]);

        // Admin side requires unsafe-inline which doesnt work together with nonces or strict-dynamic.
        if (is_admin()) {
            $this->addDirective(Directive::SCRIPT, Keyword::UNSAFE_INLINE);
        } else {
            // Propagate trust for scripts with a nonce
            $this->addNonceForDirective(Directive::SCRIPT);
            $this->addDirective(Directive::SCRIPT, [Keyword::STRICT_DYNAMIC, Keyword::UNSAFE_INLINE, 'https:']);
        }

        // React development builds contain eval
        if (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG && wp_get_environment_type() === 'development') {
            $this->addDirective(Directive::SCRIPT, Keyword::UNSAFE_EVAL);
        }

        // WooCommerce variable products use underscore templates
        if (function_exists('is_product') && is_product() && wc_get_product()->is_type('variable')) {
            $this->addDirective(Directive::SCRIPT, Keyword::UNSAFE_EVAL);
        }
    }
}

<?php

namespace App\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;
use Spatie\Csp\Scheme;

class GoogleTagManagerPreview implements Preset
{
    public function configure(Policy $policy): void
    {
        $policy
            // @see https://developers.google.com/tag-platform/security/guides/csp
            // Google Tag Manager - Preview
            ->add(Directive::STYLE, ['https://googletagmanager.com', 'https://www.googletagmanager.com', 'https://tagmanager.google.com', 'https://fonts.googleapis.com'])
            ->add(Directive::IMG, ['https://googletagmanager.com', 'https://ssl.gstatic.com', 'https://www.gstatic.com', 'https://fonts.gstatic.com'])
            ->add(Directive::FONT, ['https://fonts.gstatic.com', Scheme::DATA]);
    }
}

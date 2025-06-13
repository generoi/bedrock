<?php

namespace App\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;

class GoogleAds implements Preset
{
    public function configure(Policy $policy): void
    {
        $policy
            ->add(Directive::SCRIPT, [
                'https://www.googleadservices.com',
                'https://www.google.com',
                'https://www.googletagmanager.com',
                'https://pagead2.googlesyndication.com',
                'https://googleads.g.doubleclick.net',
            ])
            ->add(Directive::IMG, [
                'https://www.googletagmanager.com',
                'https://googleads.g.doubleclick.net',
                'https://www.google.com',
                'https://pagead2.googlesyndication.com',
                'https://www.googleadservices.com',
                'https://google.com',
                'https://www.google.com',
            ])
            ->add(Directive::FRAME, [
                'https://www.googletagmanager.com',
                'https://td.doubleclick.net',
            ])
            ->add(Directive::CONNECT, [
                'https://pagead2.googlesyndication.com',
                'https://www.googleadservices.com',
                'https://www.google.com',
                'https://google.com',
            ]);
    }
}

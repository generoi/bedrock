<?php

namespace App\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;

/**
 * @see https://support.cookiebot.com/hc/en-us/articles/360018907220-Cookiebot-and-Content-Security-Protocol-CSP
 */
class Cookiebot implements Preset
{
    public function configure(Policy $policy): void
    {
        $policy
            ->add(Directive::SCRIPT, [
                'https://consent.cookiebot.com',
                'https://consentcdn.cookiebot.com',
            ])
            ->add(Directive::CONNECT, [
                'https://consentcdn.cookiebot.com',
                'https://consent.cookiebot.com',
            ])
            ->add(Directive::FRAME, [
                'https://consentcdn.cookiebot.com',
            ])
            ->add(Directive::IMG, [
                'http://imgsct.cookiebot.com',
            ]);
    }
}

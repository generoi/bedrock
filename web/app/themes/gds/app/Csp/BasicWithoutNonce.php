<?php

namespace App\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policy;
use Spatie\Csp\Presets\Basic;

// Spatie's Basic preset calls addNonce(STYLE), which makes CSP3 browsers
// ignore 'unsafe-inline' for style-src — blocking every WordPress core /
// plugin inline <style> tag (none of them carry a nonce). We can't add
// nonces to WP's inline styles globally, so drop the style nonce and let
// 'unsafe-inline' (added in WordPress.php) cover them.
//
// The script nonce is dropped here too and added by WordPress.php instead,
// which is where 'strict-dynamic' lives — that keyword authorises scripts by
// nonce alone, so the two belong together.
class BasicWithoutNonce extends Basic
{
    public function configure(Policy $policy): void
    {
        $policy
            ->add(Directive::BASE, Keyword::SELF)
            ->add(Directive::CONNECT, Keyword::SELF)
            ->add(Directive::DEFAULT, Keyword::SELF)
            ->add(Directive::FONT, Keyword::SELF)
            ->add(Directive::FORM_ACTION, Keyword::SELF)
            ->add(Directive::FRAME, Keyword::SELF)
            ->add(Directive::IMG, Keyword::SELF)
            ->add(Directive::MEDIA, Keyword::SELF)
            ->add(Directive::OBJECT, Keyword::NONE)
            ->add(Directive::SCRIPT, Keyword::SELF)
            ->add(Directive::STYLE, Keyword::SELF);
    }
}

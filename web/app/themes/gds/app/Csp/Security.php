<?php

namespace App\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;

class Security implements Preset
{
    public function configure(Policy $policy): void
    {
        $policy
            // Prevent clickjacking by not allowing page to be embedded
            ->add(Directive::FRAME_ANCESTORS, Keyword::SELF);
    }
}

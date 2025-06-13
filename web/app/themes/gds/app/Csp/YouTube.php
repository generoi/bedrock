<?php

namespace App\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;

class YouTube implements Preset
{
    public function configure(Policy $policy): void
    {
        $policy
            ->add(Directive::FRAME, ['www.youtube.com'])
            ->add(Directive::IMG, ['img.youtube.com', 'i.ytimg.com']);
    }
}

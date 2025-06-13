<?php

namespace App\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;

class SampleContent implements Preset
{
    public function configure(Policy $policy): void
    {
        $policy
            ->add(Directive::MEDIA, 'samplelib.com')
            ->add(Directive::IMG, ['cldup.com']);
    }
}

<?php

namespace App\Providers;

use Illuminate\Support\AggregateServiceProvider;

class ThemeServiceProvider extends AggregateServiceProvider
{
    protected $providers = [
        \App\Providers\BlockPatternServiceProvider::class,
        \App\Providers\BlockServiceProvider::class,
        \App\Providers\ComponentServiceProvider::class,
        \App\Providers\SageServiceProvider::class,
        \App\Providers\PerformanceServiceProvider::class,
        \App\Providers\AsyncLoaderServiceProvider::class,
        \Spatie\GoogleFonts\GoogleFontsServiceProvider::class,
        \Log1x\SageSvg\SageSvgServiceProvider::class,
    ];
}

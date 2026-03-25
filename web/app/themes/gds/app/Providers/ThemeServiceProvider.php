<?php

namespace App\Providers;

use Genero\Sage\CacheTags\CacheTagsServiceProvider;
use Illuminate\Support\AggregateServiceProvider;
use Log1x\SageSvg\SageSvgServiceProvider;
use Spatie\Csp\CspServiceProvider;
use Spatie\GoogleFonts\GoogleFontsServiceProvider;

class ThemeServiceProvider extends AggregateServiceProvider
{
    protected $providers = [
        BlockServiceProvider::class,
        ComponentServiceProvider::class,
        SageServiceProvider::class,
        PerformanceServiceProvider::class,
        AsyncLoaderServiceProvider::class,
        CspServiceProvider::class,
        CacheControlServiceProvider::class,
        ContentSecurityPolicyServiceProvider::class,
        GoogleFontsServiceProvider::class,
        SageSvgServiceProvider::class,
        CacheTagsServiceProvider::class,
    ];
}

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
        \Spatie\Csp\CspServiceProvider::class,
        \App\Providers\CacheControlServiceProvider::class,
        \App\Providers\ContentSecurityPolicyServiceProvider::class,
        \Spatie\GoogleFonts\GoogleFontsServiceProvider::class,
        \Log1x\SageSvg\SageSvgServiceProvider::class,
        \Genero\Sage\CacheTags\CacheTagsServiceProvider::class,
        \Genero\Sage\WooCommerce\WooCommerceServiceProvider::class,
    ];
}

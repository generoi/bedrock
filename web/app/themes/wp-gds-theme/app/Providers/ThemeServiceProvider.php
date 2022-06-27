<?php

namespace App\Providers;

use Illuminate\Support\AggregateServiceProvider;

class ThemeServiceProvider extends AggregateServiceProvider
{
    protected $providers = [
        \App\Providers\BlockPatternServiceProvider::class,
        \App\Providers\SageServiceProvider::class,
    ];
}

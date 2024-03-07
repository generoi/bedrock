<?php

namespace App\Providers;

use App\SageSvg\SageSvg;
use Log1x\SageSvg\SageSvg as BaseSageSvg;
use Roots\Acorn\Sage\SageServiceProvider as BaseSageServiceProvider;

class SageServiceProvider extends BaseSageServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        parent::register();
    }

    public function boot()
    {
        parent::boot();

        $this->app->extend(BaseSageSvg::class, function () {
            return new SageSvg($this->app->config->get('svg', []));
        });
    }
}

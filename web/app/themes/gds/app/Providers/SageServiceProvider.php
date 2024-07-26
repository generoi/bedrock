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

        add_filter('script_loader_tag', [$this, 'scriptLoaderTag'], 10, 3);
    }

    public function boot()
    {
        parent::boot();

        $this->app->extend(BaseSageSvg::class, function () {
            return new SageSvg($this->app->make('files'));
        });
    }

    public function scriptLoaderTag(string $tag, string $handle, string $src): string
    {
        if (str_starts_with($handle, 'sage/') || str_starts_with($handle, 'gds-')) {
            $tag = str_replace('<script ', '<script type="module" ', $tag);
        }
        return $tag;
    }
}

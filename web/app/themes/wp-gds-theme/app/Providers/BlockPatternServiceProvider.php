<?php

namespace App\Providers;

use Roots\Acorn\ServiceProvider;
use Symfony\Component\Finder\Finder;

class BlockPatternServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerBlockPatterns();
    }

    protected function registerBlockPatterns()
    {
        $appName = $this->app['config']->get('app.name');
        $patterns = $this->app['config']->get('theme.patterns');
        $patternDir = $this->app->resourcePath('patterns');

        foreach ($patterns as $pattern) {
            $slug = $pattern['name'];
            $filepath = $patternDir . '/' . ($pattern['file'] ?? "$slug.html");

            register_block_pattern("$appName/$slug", [
                'title' => $pattern['title'],
                'content' => $pattern['content'] ?? file_get_contents($filepath),
                'categories' => $pattern['categories'] ?? [],
            ]);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    }
}

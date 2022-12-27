<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Symfony\Component\Finder\Finder;

class ComponentServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->loadComponents();
        $this->addViewNamespace();
    }

    public function loadComponents()
    {
        $dir = $this->app->resourcePath('components');

        foreach ((new Finder())->in($dir)->name('*.php') as $file) {
            $blockDefinitions = [
                'index.php',
                basename($file->getPath()) . '.php',
            ];

            if (!in_array($file->getFilename(), $blockDefinitions)) {
                continue;
            }

            include_once $file->getRealPath();
        }
    }

    public function addViewNamespace()
    {
        $this->app->make('view')->addNamespace(
            'components',
            $this->app->resourcePath('blocks')
        );
    }
}

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
        $namespace = $this->app->getNamespace() . 'components\\';

        foreach ((new Finder())->in($dir)->name('*.php') as $file) {
            if ($file->getFilename() === 'index.php') {
                include_once $file->getRealPath();
                continue;
            }

            $relativePath = str_replace($dir . DIRECTORY_SEPARATOR, '', $file->getPathname());
            $composer = $namespace . str_replace(
                ['/', '.php'],
                ['\\', ''],
                $relativePath
            );

            if (class_exists($composer)) {
                new $composer;
            }
        }
    }

    public function addViewNamespace()
    {
        $this->app->make('view')->addNamespace(
            'components',
            $this->app->resourcePath('components')
        );
    }
}

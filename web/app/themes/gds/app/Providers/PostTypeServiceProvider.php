<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Symfony\Component\Finder\Finder;
use Illuminate\Support\Str;
use ReflectionClass;

class PostTypeServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $path = $this->app->path() . '/PostTypes';
        $namespace = $this->app->getNamespace();

        foreach ((new Finder())->in($path)->files() as $file) {
            $postType = $namespace . str_replace(
                ['/', '.php'],
                ['\\', ''],
                Str::after($file->getPathname(), Str::beforeLast($file->getPath(), '/') . DIRECTORY_SEPARATOR)
            );

            if (
                ! (new ReflectionClass($postType))->isAbstract()
            ) {
                new $postType();
            }
        }
    }
}

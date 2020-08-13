<?php

namespace Genero\Sage\NativeBlock;

use ReflectionClass;
use Illuminate\Support\Str;
use Roots\Acorn\ServiceProvider;
use Symfony\Component\Finder\Finder;

class NativeBlockServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $path = $this->app->path('Blocks');

        foreach ((new Finder())->in($path)->files() as $composer) {
            $composer = $this->app->getNamespace() . str_replace(
                ['/', '.php'],
                ['\\', ''],
                Str::after($composer->getPathname(), $this->app->path() . DIRECTORY_SEPARATOR)
            );

            if (
                is_subclass_of($composer, NativeBlock::class) &&
                ! (new ReflectionClass($composer))->isAbstract()
            ) {
                (new $composer($this->app))->compose();
            }
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

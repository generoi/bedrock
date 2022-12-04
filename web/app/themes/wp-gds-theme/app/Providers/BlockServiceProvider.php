<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Symfony\Component\Finder\Finder;

class BlockServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        add_action('init', [$this, 'registerBlocks']);
        $this->addViewNamespace();
    }

    public function registerBlocks()
    {
        $blocksDir = $this->app->resourcePath('blocks');

        foreach ((new Finder())->in($blocksDir)->name('*.php') as $block) {
            $blockDefinitions = [
                'index.php',
                // block-name.php
                basename($block->getPath()) . '.php',
            ];

            if (!in_array($block->getFilename(), $blockDefinitions)) {
                continue;
            }

            include_once $block->getRealPath();
        }
    }

    public function addViewNamespace()
    {
        $this->app->make('view')->addNamespace('blocks', $this->app->resourcePath('blocks'));
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

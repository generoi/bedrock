<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Symfony\Component\Finder\Finder;

class BlockFiltersServiceProvider extends ServiceProvider
{
    public function register()
    {
        add_action('init', [$this, 'registerBlockFilters']);
    }

    public function registerBlockFilters()
    {
        $blockFiltersPath = __DIR__.'/../BlockFilters';
        $namespace = 'App\\BlockFilters\\';

        if (! is_dir($blockFiltersPath)) {
            return;
        }

        $finder = new Finder;
        $finder->files()
            ->in($blockFiltersPath)
            ->name('*.php')
            ->notName('*.blade.php');

        foreach ($finder as $file) {
            $className = $namespace.$file->getBasename('.php');

            if (! class_exists($className)) {
                continue;
            }

            // Instantiate the class, which will call its constructor to register filters
            new $className;
        }
    }
}

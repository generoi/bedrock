<?php

use App\Providers\ThemeServiceProvider;
use Roots\Acorn\Application;

/**
 * Register the theme service provider.
 * Bootstrap happens in mu-plugins/00-acorn.php.
 */
Application::getInstance()->registerDeferredProvider(
    ThemeServiceProvider::class
);

/*
|--------------------------------------------------------------------------
| Register Sage Theme Files
|--------------------------------------------------------------------------
|
| Out of the box, Sage ships with categorically named theme files
| containing common functionality and setup to be bootstrapped with your
| theme. Simply add (or remove) files from the array below to change what
| is registered alongside Sage.
|
*/

collect(['setup', 'filters', 'admin', 'helpers'])
    ->each(function ($file) {
        if (! locate_template($file = "app/{$file}.php", true, true)) {
            wp_die(
                /* translators: %s is replaced with the relative file path */
                sprintf(__('Error locating <code>%s</code> for inclusion.', 'sage'), $file)
            );
        }
    });

<?php

/**
 * PHPUnit bootstrap file
 */

use Genero\Sage\CacheTags\Concerns\CreatesDatabaseTable;
use Illuminate\Contracts\Http\Kernel;

// Give access to tests_add_filter() function.
require_once getenv('WP_PHPUNIT__DIR').'/includes/functions.php';

// Create the cache_tags table for the test database.
// DatabaseCommand::createTable() is protected and extends Illuminate\Console\Command,
// which routes unknown calls through __call() — use the trait directly instead.
tests_add_filter('muplugins_loaded', function () {
    $helper = new class
    {
        use CreatesDatabaseTable {
            createTable as public;
        }
    };
    $helper->createTable();
});

// Acorn skips HTTP bootstrapping in console mode (PHPUnit), leaving
// config/view/etc unbound. Boot the HTTP kernel after mu-plugins load
// (which includes 00-acorn.php) but before the theme's functions.php.
tests_add_filter('muplugins_loaded', function () {
    if (function_exists('app') && app()->bound(Kernel::class)) {
        app(Kernel::class)->bootstrap();
    }
}, PHP_INT_MAX);

// Start up the WP testing environment.
require getenv('WP_PHPUNIT__DIR').'/includes/bootstrap.php';

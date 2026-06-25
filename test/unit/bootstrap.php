<?php

/**
 * PHPUnit bootstrap file
 */

use Genero\Sage\CacheTags\Concerns\CreatesDatabaseTable;
use Illuminate\Contracts\Http\Kernel;
use Roots\Acorn\Application;

// Give access to tests_add_filter() function.
require_once getenv('WP_PHPUNIT__DIR').'/includes/functions.php';

tests_add_filter('muplugins_loaded', function () {
    $helper = new class
    {
        use CreatesDatabaseTable {
            createTable as public;
        }
    };

    $helper->createTable();

    // Under PHPUnit, Acorn's bootAcorn() is a no-op: it only bootstraps the
    // container for WP-CLI or real HTTP requests, neither of which applies
    // here. Without it `config` (and the rest of the container) is never bound
    // before the theme registers its service providers during theme load,
    // which throws. Bootstrap the kernel now so theme providers can resolve.
    if (Application::getInstance()->bound(Kernel::class)) {
        Application::getInstance()->make(Kernel::class)->bootstrap();
    }
}, PHP_INT_MAX);

// Start up the WP testing environment.
require getenv('WP_PHPUNIT__DIR').'/includes/bootstrap.php';

<?php

/**
 * PHPUnit bootstrap file
 */

use Genero\Sage\CacheTags\Concerns\CreatesDatabaseTable;

// Give access to tests_add_filter() function.
require_once getenv('WP_PHPUNIT__DIR').'/includes/functions.php';

tests_add_filter('muplugins_loaded', function () {
    // sage-cachetags moved createTable() into a protected trait method, so wrap
    // the trait in an anonymous class to expose it for the test database.
    $helper = new class
    {
        use CreatesDatabaseTable {
            createTable as public;
        }
    };

    $helper->createTable();
});

// Start up the WP testing environment.
require getenv('WP_PHPUNIT__DIR').'/includes/bootstrap.php';

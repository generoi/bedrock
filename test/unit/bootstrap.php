<?php

/**
 * PHPUnit bootstrap file
 */

use Genero\Sage\CacheTags\Console\DatabaseCommand;

// Give access to tests_add_filter() function.
require_once getenv('WP_PHPUNIT__DIR').'/includes/functions.php';

tests_add_filter('muplugins_loaded', function () {
    (new DatabaseCommand)->createTable();
});

// Start up the WP testing environment.
require getenv('WP_PHPUNIT__DIR').'/includes/bootstrap.php';

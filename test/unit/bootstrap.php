<?php

/**
 * PHPUnit bootstrap file
 */

use Genero\Sage\CacheTags\Concerns\CreatesDatabaseTable;

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
});

// DIAGNOSTIC: surface the masked exception chain from theme/Acorn boot.
try {
    require getenv('WP_PHPUNIT__DIR').'/includes/bootstrap.php';
} catch (\Throwable $e) {
    fwrite(STDERR, "\n=== MASKED BOOTSTRAP ERROR CHAIN ===\n");
    for ($x = $e; $x; $x = $x->getPrevious()) {
        fwrite(STDERR, get_class($x).': '.$x->getMessage()."\n    at ".$x->getFile().':'.$x->getLine()."\n");
    }
    fwrite(STDERR, "=== END CHAIN ===\n");
    throw $e;
}

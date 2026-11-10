<?php

use Roots\WPConfig\Config;

Config::define('WP_DEBUG', true);

// PHPUnit drops and recreates its tables on every run, so each checkout sharing
// a database needs its own prefix; derive it from the checkout's path.
$table_prefix = 'tests_'.substr(md5(dirname(__DIR__, 2)), 0, 6).'_';

Config::define('WP_TESTS_DOMAIN', 'example.org');
Config::define('WP_TESTS_EMAIL', 'admin@example.org');
Config::define('WP_TESTS_TITLE', 'Test');
Config::define('WP_PHP_BINARY', 'php');
Config::define('WPLANG', '');
// Run tests as single-site
Config::define('WP_TESTS_MULTISITE', false);
Config::define('MULTISITE', false);

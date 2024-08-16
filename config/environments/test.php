<?php

use Roots\WPConfig\Config;

Config::define('WP_DEBUG', true);

$table_prefix = 'tests_';

Config::define('WP_TESTS_DOMAIN', 'example.org');
Config::define('WP_TESTS_EMAIL', 'admin@example.org');
Config::define('WP_TESTS_TITLE', 'Test');
Config::define('WP_PHP_BINARY', 'php');
Config::define('WPLANG', '');
// Run tests as single-site
Config::define('WP_TESTS_MULTISITE', false);
Config::define('MULTISITE', false);

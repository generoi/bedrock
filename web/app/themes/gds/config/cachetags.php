<?php

use Genero\Sage\CacheTags\Actions\Blocks;
use Genero\Sage\CacheTags\Actions\Core;
use Genero\Sage\CacheTags\Actions\DebugComment;
use Genero\Sage\CacheTags\Actions\Gravityform;
use Genero\Sage\CacheTags\Actions\WooCommerce;
use Genero\Sage\CacheTags\Actions\Site;
use Genero\Sage\CacheTags\Invalidators\DebugCacheInvalidator;
use Genero\Sage\CacheTags\Invalidators\KinstaCacheInvalidator;
use Genero\Sage\CacheTags\Stores\WordpressDbStore;

$currentHost = parse_url(WP_HOME, PHP_URL_HOST);
$isDevelopment = str_contains($currentHost, '.ddev.site');
$isStaging = str_contains($currentHost, 'staging');
$isProduction = ! $isDevelopment && ! $isStaging;

return [
    'disable' => false,
    'debug' => defined('WP_DEBUG') ? WP_DEBUG : false,
    'http-header' => 'Cache-Tag',
    'store' => WordpressDbStore::class,
    'invalidator' => [
        $isProduction ? KinstaCacheInvalidator::class : null,
    ],
    'action' => [
        Core::class,
        DebugComment::class,
        Gravityform::class,
        WooCommerce::class,
        Site::class,
    ]
];

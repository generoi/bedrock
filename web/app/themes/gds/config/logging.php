<?php

/**
 * Acorn's file channels log to storage_path('logs'), and storage falls back to
 * web/app/cache/acorn, inside the docroot. Point them at ACORN_LOG_PATH
 * (config/application.php), outside it. Acorn merges logging.channels by name,
 * so every other channel keeps Acorn's own definition.
 */
return [
    'channels' => [
        'single' => [
            'driver' => 'single',
            'path' => ACORN_LOG_PATH.'/laravel.log',
            'level' => env('LOG_LEVEL', 'debug'),
            'replace_placeholders' => true,
        ],

        'daily' => [
            'driver' => 'daily',
            'path' => ACORN_LOG_PATH.'/laravel.log',
            'level' => env('LOG_LEVEL', 'debug'),
            'days' => env('LOG_DAILY_DAYS', 14),
            'replace_placeholders' => true,
        ],

        'emergency' => [
            'path' => ACORN_LOG_PATH.'/laravel.log',
        ],
    ],
];

<?php

use function Roots\public_path;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Assets Manifest
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default asset manifest that should be used.
    | The "theme" manifest is recommended as the default as it cedes ultimate
    | authority of your application's assets to the theme.
    |
    */

    'default' => 'theme',

    /*
    |--------------------------------------------------------------------------
    | Assets Manifests
    |--------------------------------------------------------------------------
    |
    | Manifests contain lists of assets that are referenced by static keys that
    | point to dynamic locations, such as a cache-busted location. We currently
    | support two types of manifest:
    |
    | assets: key-value pairs to match assets to their revved counterparts
    |
    | bundles: a series of entrypoints for loading bundles
    |
    */

    'manifests' => [
        'theme' => [
            'path' => get_theme_file_path('public'),
            'url' => get_theme_file_uri('public'),
            'assets' => public_path('mix-manifest.json'),
        ]
    ],

    'deferred_scripts' => [
        'sage/vendor.js',
        'sage/app.js',
        'sage/editor.js',
        'comment-reply',
        'wp-embed',
        'debug-bar-js',
        'admin-bar',
        'debug-bar',
        'wp-genero-cookieconsent/js',
    ],

    'async_scripts' => [
        'sage/fontawesome.js',
        'sage/gds.js',
    ],

    'async_styles' => [
        'dashicons',
        'debug-bar',
        'ptam-style-css',
        'ptam-style-css-editor',
        'shc-show-env',
        'wp-block-library-theme',
        'wp-smart-crop-renderer',
        'wp-genero-cookieconsent/css/library',
        'wp-genero-cookieconsent/css',
    ],
];

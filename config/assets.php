<?php

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
    | point to dynamic locations, such as a cache-busted location. A manifest
    | may employ any number of strategies for determining absolute local and
    | remote paths to assets.
    |
    | Supported Strategies: "relative"
    |
    | Note: We will add first-party support for more strategies in the future.
    |
    */

    'manifests' => [
        'theme' => [
            'strategy' => 'relative',
            'path' => get_theme_file_path('/dist'),
            'uri' => get_theme_file_uri('/dist'),
            'manifest' => get_theme_file_path('/dist/mix-manifest.json'),
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

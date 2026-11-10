<?php

return [

    'manifests' => [],

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
        'moxiejs', // gravityforms
        'plupload', // gravityforms
    ],

    'async_scripts' => [
        'sage/fontawesome.js',
        'sage/gds.js',
    ],

    'async_styles' => [
        // 'sage/fonts.css',
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

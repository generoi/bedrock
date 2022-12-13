<?php

return [
    'config' => [
        'forward' => ['dataLayer.push', 'fbq'],
        'logScriptExecution' => WP_DEBUG,
        'logCalls' => WP_DEBUG,
        'logGetters' => WP_DEBUG,
        'logSetters' => WP_DEBUG,
        'debug' => WP_DEBUG,
        'lib' => parse_url(dirname(asset('~partytown/partytown.js')->uri()), PHP_URL_PATH) . '/',
    ],
];

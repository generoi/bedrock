<?php

return [
    'disabled' => false,
    'config' => [
        'forward' => ['dataLayer.push', 'fbq', 'gtag'],
        'logScriptExecution' => false,
        'logCalls' => false,
        'logGetters' => false,
        'logSetters' => false,
        'debug' => WP_DEBUG,
        'lib' => parse_url(dirname(asset('~partytown/partytown.js')->uri()), PHP_URL_PATH) . '/',
    ],
];

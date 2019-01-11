<?php

return [
    // Location where views are searched for.
    'dirname' => [
        'views',
        'views/pages',
    ],

    // If twig caching is enabled or not.
    'cache' => defined('WP_CACHE') ? WP_CACHE : false
];

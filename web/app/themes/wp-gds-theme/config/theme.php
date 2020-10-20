<?php

return [
    'editor-color-palette' => [
        [
            'name'  => __('White', 'gds'),
            'slug'  => 'white',
            'color' => '#fff',
        ],
        [
            'name'  => __('Light gray', 'gds'),
            'slug'  => 'ui-background-01',
            'color' => '#eee',
        ],
        [
            'name'  => __('Light gray 50%', 'gds'), // @todo style guide has outdated value
            'slug'  => 'ui-background-02',
            'color' => 'rgb(238 238 238 / 50%)',
        ],
        [
            'name'  => __('Medium gray', 'gds'),
            'slug'  => 'ui-01',
            'color' => '#acacac',
        ],
        [
            'name'  => __('Dark gray', 'gds'),
            'slug'  => 'ui-02',
            'color' => '#646464',
        ],
        [
            'name'  => __('Black', 'gds'),
            'slug'  => 'black',
            'color' => '#333031',
        ],
        [
            'name'  => __('Green', 'gds'),
            'slug'  => 'ui-03',
            'color' => '#00a06e',
        ],
        [
            'name'  => __('Blue', 'gds'),
            'slug'  => 'ui-04',
            'color' => '#00a3b7',
        ],
        [
            'name'  => __('Red', 'gds'),
            'slug'  => 'ui-05',
            'color' => '#f1615e',
        ],
        [
            'name'  => __('Pink', 'gds'),
            'slug'  => 'ui-06',
            'color' => '#ffdcdd',
        ],
        [
            'name'  => __('Purple', 'gds'),
            'slug'  => 'ui-07',
            'color' => '#9185db',
        ],
    ],
    'editor-font-sizes' => [
        [
            'name' => __('S paragraph', 'gds'),
            'slug' => 's-paragraph',
            'size' => 15,
        ],
        [
            'name' => __('M paragraph', 'gds'),
            'slug' => 'm-paragraph',
            'size' => 17,
        ],
        [
            'name' => __('L paragraph', 'gds'),
            'slug' => 'l-paragraph',
            'size' => 20,
        ],
        [
            'name' => __('S heading', 'gds'),
            'slug' => 's-heading',
            'size' => 19,
        ],
        [
            'name' => __('M heading', 'gds'),
            'slug' => 'm-heading',
            'size' => 20,
        ],
        [
            'name' => __('L heading', 'gds'),
            'slug' => 'l-heading',
            'size' => 36,
        ],
        [
            'name' => __('XL heading', 'gds'),
            'slug' => 'xl-heading',
            'size' => 60,
        ],
        [
            'name' => __('XXL heading', 'gds'),
            'slug' => 'xxl-heading',
            'size' => 62,
        ],
    ],
    'editor-gradient-presets' => [
        [
            'name'     => __('Green radial gradient', 'gds'),
            'slug'     => 'block-01',
            'gradient' => 'radial-gradient(closest-side, #000000, #ffffff)',
        ],
    ],
];

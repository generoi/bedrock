<?php

return [
    // Grid system used.
    'grid' => 'xy-grid',

    // Palette colors.
    'color' => [
        'primary'   => __('Primary', '<example-project>'),
        'secondary' => __('Secondary', '<example-project>'),
        'white'     => __('White', '<example-project>'),
        'black'     => __('Black', '<example-project>'),
    ],

    // Different palettes
    'palette' => [
        'button' => ['primary', 'secondary'],
        'overlay' => ['primary', 'secondary'],
        'background' => ['primary', 'secondary'],
    ],

    // Declared breakpoints.
    // 'breakpoint' => [
    //     'small'   => 0,
    //     'medium'  => 640,
    //     'large'   => 1024,
    //     'xlarge'  => 1200,
    //     'xxlarge' => 1440,
    // ],

    // Responsive font sizes, used to calculate the content width.
    'fontsize' => [
        'small' => 16,
        'large' => 18,
    ],

    // The length of a paragraph in REM's, used to calculate the content width.
    'paragraph_width' => 45,
];

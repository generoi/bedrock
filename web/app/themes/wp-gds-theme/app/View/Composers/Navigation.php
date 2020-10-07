<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use Log1x\Navi\Facades\Navi;

class Navigation extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'partials.header',
    ];

    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {
        return [
            'primary_navigation' => $this->primaryNavigation(),
        ];
    }

    public function primaryNavigation()
    {
        return Navi::build('primary_navigation')->toArray();
    }
}

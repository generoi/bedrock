<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use Log1x\Navi\Navi;

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

    public function primaryNavigation(): array
    {
        if (!has_nav_menu('primary_navigation')) {
            return [];
        }

        $navigation = (new Navi())->build('primary_navigation');

        if ($navigation->isEmpty()) {
            return [];
        }

        return $navigation->toArray();
    }
}

<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class App extends Composer
{
    /** {@inheritdoc} */
    protected static $views = [
        '*',
    ];

    /**
     * @return array<string,mixed>
     */
    public function with()
    {
        return [
            'siteName' => $this->siteName(),
            'home_url' => $this->homeUrl(),
        ];
    }

    public function homeUrl(): string
    {
        return function_exists('pll_home_url') ? pll_home_url() : home_url('/');
    }

    public function siteName(): string
    {
        return get_bloginfo('name', 'display');
    }
}

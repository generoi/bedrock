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
        ];
    }

    public function siteName(): string
    {
        return get_bloginfo('name', 'display');
    }
}

<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class ContentSingle extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'partials.content-single',
    ];

    /**
     * @return array
     */
    public function with()
    {
        return [
            'label' => $this->label(),
            'categories' => $this->categories(),
        ];
    }

    public function label(): string
    {
        return sprintf(
            '%s, %s',
            get_the_author_meta('display_name'),
            get_the_date()
        );
    }

    public function categories(): array
    {
        return get_the_category();
    }
}

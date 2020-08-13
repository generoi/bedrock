<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class ContentSingleCase extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'partials.content-single-case',
        'teasers.case',
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
        $clients = get_the_terms(get_the_ID(), 'client');
        return $clients ? reset($clients)->name : '';
    }

    public function categories(): array
    {
        return get_the_terms(get_the_ID(), 'service') ?: [];
    }
}

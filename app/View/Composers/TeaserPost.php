<?php

namespace App\View\Composers;

use App\View\Composers\Teaser;
use stdClass;

class TeaserPost extends Teaser
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'teasers.post',
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function with()
    {
        return [
            'image' => $this->image(),
            'title' => $this->title(),
            'excerpt' => $this->excerpt(),
            'categories' => $this->categories(),
            'date' => get_the_date(),
        ];
    }


    public function excerpt(): string
    {
        return get_the_excerpt();
    }
}

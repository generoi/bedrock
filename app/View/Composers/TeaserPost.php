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
        $post = get_post();

        return [
            'image' => $this->image($post),
            'title' => $this->title($post),
            'excerpt' => $this->excerpt($post),
            'categories' => $this->categories($post),
            'date' => get_the_date(),
        ];
    }


    public function excerpt(): string
    {
        return get_the_excerpt();
    }
}

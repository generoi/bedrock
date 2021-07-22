<?php

namespace App\View\Composers;

use App\View\Composers\Teaser;
use WP_Post;

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
            'categories' => $this->categories($post),
            'date' => $this->publishedDate($post),
        ];
    }

    public function excerpt(WP_Post $post): string
    {
        return get_the_excerpt();
    }
}

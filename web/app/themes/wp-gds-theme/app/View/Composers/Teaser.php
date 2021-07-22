<?php

namespace App\View\Composers;

use App\View\Composers\Traits\HasPost;
use Roots\Acorn\View\Composer;

class Teaser extends Composer
{
    use HasPost;

    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'teasers.teaser',
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function override()
    {
        $post = get_post();

        return [
            'image' => $this->image($post),
            'title' => $this->title($post),
            'excerpt' => $this->excerpt($post),
            'categories' => $this->categories($post),
        ];
    }
}

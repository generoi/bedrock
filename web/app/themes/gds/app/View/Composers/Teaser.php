<?php

namespace App\View\Composers;

use App\View\Composers\Traits\HasPost;
use Roots\Acorn\View\Composer;

class Teaser extends Composer
{
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
    public function with()
    {
        $post = $this->view->post ?? get_post();

        return [
            'image' => get_post_thumbnail_id($post),
            'title' => get_the_title($post),
            'excerpt' => get_the_excerpt($post),
            'categories' => get_the_category($post->ID),
        ];
    }
}

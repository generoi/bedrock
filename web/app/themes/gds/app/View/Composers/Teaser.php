<?php

namespace App\View\Composers;

use App\View\Composers\Traits\HasPost;
use Roots\Acorn\View\Composer;

class Teaser extends Composer
{
    /** {@inheritdoc} */
    protected static $views = [
        'teasers.teaser',
    ];

    /**
     * @return array<string,mixed>
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

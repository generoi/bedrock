<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use WP_Post;
use WP_Query;

class ContentSingle extends Composer
{
    /** {@inheritdoc} */
    protected static $views = [
        'content.single',
    ];

    /**
     * @return array<string,mixed>
     */
    public function with()
    {
        $post = get_post();

        return [
            'related' => $this->related($post),
        ];
    }

    public function related(WP_Post $post): WP_Query
    {
        return new WP_Query([
            'category__in' => wp_list_pluck(get_the_category($post->ID), 'term_id'),
            'post__not_in' => [$post->ID],
            'post_type' => 'post',
            'posts_per_page' => 2,
            'post_status' => 'publish',
            'ignore_sticky_posts' => true,
        ]);
    }
}

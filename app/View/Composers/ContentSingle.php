<?php

namespace App\View\Composers;

use App\View\Composers\Traits\HasPost;
use Roots\Acorn\View\Composer;
use stdClass;
use WP_Query;

class ContentSingle extends Composer
{
    use HasPost;

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
        $post = get_post();

        return [
            'label' => $this->label($post),
            'categories' => $this->categories($post),
            'related' => $this->related(),

        ];
    }

    public function related(): ?stdClass
    {
        return (object) [
            'label' => __('Read More', 'gds'),
            'type' => 'article',
            'query' => new WP_Query([
                'category__in' => wp_list_pluck(get_the_category(), 'term_id'),
                'post__not_in' => [get_the_ID()],
                'post_type' => 'post',
                'posts_per_page' => 2,
                'post_status' => 'publish',
                'ignore_sticky_posts' => true,
            ]),
        ];
    }
}

<?php

namespace App\View\Composers\Traits;

use WP_Post;

trait HasPost
{
    public function image(WP_Post $post): ?int
    {
        if (has_post_thumbnail($post)) {
            return get_post_thumbnail_id($post) ?: null;
        }
        return null;
    }

    public function title(WP_Post $post): string
    {
        return get_the_title($post);
    }

    public function permalink(WP_Post $post): string
    {
        return get_permalink($post);
    }

    public function categories(WP_Post $post): array
    {
        return get_the_category($post->ID);
    }

    public function author(WP_Post $post): string
    {
        return get_the_author_meta('display_name', $post->post_author);
    }

    public function publishedDate(WP_Post $post): string
    {
        return get_the_date('', $post);
    }

    public function excerpt(WP_Post $post): string
    {
        if ($post->post_excerpt) {
            return wp_strip_all_tags(get_the_excerpt($post));
        }

        return '';
    }
}

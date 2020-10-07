<?php

namespace App\View\Composers\Traits;

use WP_Post;

use function Roots\asset;

trait HasPost
{
    public function image(WP_Post $post): string
    {
        $url = asset('images/default-teaser.jpg');

        if (has_post_thumbnail($post)) {
            $image = wp_get_attachment_image_src(get_post_thumbnail_id($post), 'large');

            if ($image) {
                $url = $image[0];
            }
        }

        return $url;
    }

    public function title(WP_Post $post): string
    {
        return get_the_title($post);
    }

    public function label(WP_Post $post): string
    {
        return sprintf(
            '%s, %s',
            get_the_author_meta('display_name', $post->post_author),
            get_the_date('', $post)
        );
    }

    public function categories(WP_Post $post): array
    {
        return get_the_category($post->ID);
    }
}

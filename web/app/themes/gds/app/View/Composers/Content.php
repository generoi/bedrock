<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use WP_Post;

class Content extends Composer
{
    protected static $views = [
        'content.*',
    ];

    public function with()
    {
        $post = get_post();

        return [
            'has_page_title' => $this->hasPageTitle($post),
        ];
    }

    public function hasPageTitle(WP_Post $post): bool
    {
        if (str_contains($post->post_content, '</h1>')) {
            return true;
        }
        if (str_contains($post->post_content, '<!-- wp:post-title')) {
            return true;
        }
        return false;
    }
}

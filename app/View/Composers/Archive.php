<?php

namespace App\View\Composers;

use App\View\Composers\Traits\HasPost;
use Roots\Acorn\View\Composer;
use WP_Post;
use WP_Query;

class Archive extends Composer
{
    use HasPost;

    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'archive',
        'home',
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function with()
    {
        return [
            'query' => $this->query(),
            'page' => $this->page(),
            'has_archive_block' => $this->hasArchiveBlock(),
        ];
    }

    public function page(): ?WP_Post
    {
        $post = get_post();
        return $post->post_type === 'page' ? $post : null;
    }

    public function hasArchiveBlock(): bool
    {
        return $this->page() && strpos($this->page()->post_content, 'acf/article-list') !== false;
    }

    public function query(): WP_Query
    {
        return $GLOBALS['wp_query'];
    }
}

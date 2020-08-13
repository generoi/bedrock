<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use stdClass;
use WP_Post;
use WP_Query;

class ArchiveCase extends Composer
{
    protected $featuredPost;

    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'archive-case',
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function with()
    {
        return [
            'featured' => $this->featured(),
            'query' => $this->query(),
        ];
    }

    public function featured(): stdClass
    {
        return (object) [
            'post' => $this->featuredPost(),
            'permalink' => get_permalink($this->featuredPost()),
            'title' => get_the_title($this->featuredPost()),
            'label' => $this->featuredPostLabel(),
            'categories' => $this->featuredPostCategories(),
            'thumbnail' => get_the_post_thumbnail($this->featuredPost()),

        ];
    }

    public function featuredPost(): WP_Post
    {
        if (!$this->featuredPost) {
            $this->featuredPost = $this->query()->next_post();
        }
        return $this->featuredPost;
    }

    public function featuredPostLabel(): string
    {
        $clients = get_the_terms($this->featuredPost(), 'client');
        return $clients ? reset($clients)->name : '';
    }

    public function featuredPostCategories(): array
    {
        return get_the_terms($this->featuredPost(), 'service') ?: [];
    }

    public function query(): WP_Query
    {
        return $GLOBALS['wp_query'];
    }
}

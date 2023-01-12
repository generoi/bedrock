<?php

namespace App\View\Composers;

use App\View\Composers\Traits\HasPost;
use Roots\Acorn\View\Composer;
use WP_Post;
use WP_Query;

class Archive extends Composer
{
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
            'content' => $this->content(),
        ];
    }

    public function content(): string
    {
        if (is_tax() || is_category() || is_tag()) {
            return apply_filters('the_content', term_description());
        }

        return '';
    }

    public function query(): WP_Query
    {
        return $GLOBALS['wp_query'];
    }
}

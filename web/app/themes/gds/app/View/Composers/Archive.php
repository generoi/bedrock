<?php

namespace App\View\Composers;

use App\View\Composers\Traits\HasPost;
use Roots\Acorn\View\Composer;
use WP_Post;
use WP_Query;

class Archive extends Composer
{
    /** {@inheritdoc} */
    protected static $views = [
        'archive',
        'home',
    ];

    /**
     * @return array<string,mixed>
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

<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

use function Roots\asset;

class Teaser extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'teasers.teaser',
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function with()
    {
        return [
            'image' => $this->image(),
            'title' => $this->title(),
            'excerpt' => $this->excerpt(),
            'categories' => $this->categories(),
        ];
    }

    public function image(): string
    {
        $url = asset('images/default-teaser.jpg');

        if (has_post_thumbnail()) {
            $image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'large');

            if ($image) {
                $url = $image[0];
            }
        }

        return $url;
    }

    public function title(): string
    {
        return get_the_title();
    }

    public function excerpt(): string
    {
        return sprintf(
            '%s, %s',
            get_the_author_meta('display_name'),
            get_the_date()
        );
    }

    public function categories(): array
    {
        return get_the_category();
    }
}

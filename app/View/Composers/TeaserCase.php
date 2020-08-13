<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use stdClass;

class TeaserCase extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'teasers.case',
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function with()
    {
        return [
            'title' => $this->title(),
            'excerpt' => $this->excerpt(),
            'categories' => $this->categories(),
            'superimposed_image' => $this->superimposedImage(),
            'superimposed_offset' => $this->superimposedOffset(),
        ];
    }

    public function title(): string
    {
        $clients = get_the_terms(get_the_ID(), 'client');
        return $clients ? reset($clients)->name : '';
    }

    public function excerpt(): string
    {
        return get_the_excerpt();
    }

    public function categories(): array
    {
        return get_the_terms(get_the_ID(), 'service') ?: [];
    }

    public function superimposedImage(): string
    {
        if ($imageId = get_field('superimposed_image', get_the_ID())) {
            $image = wp_get_attachment_image_src($imageId, 'large');

            if ($image) {
                return $image[0];
            }
        }

        return '';
    }

    public function superimposedOffset(): ?stdClass
    {
        if ($offset = get_field('superimposed_offset', get_the_ID())) {
            return (object) collect($offset)
                ->map(function ($value) {
                    return intval($value);
                })
                ->all();
        }
        return null;
    }
}

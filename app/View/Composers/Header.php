<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use stdClass;

class Header extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'partials.header',
    ];

    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {
        return [
            'site_name' => $this->siteName(),
            'languages' => $this->languages(),
        ];
    }

    public function languages()
    {
        $languages = apply_filters('wpml_active_languages', null, [
            'skip_missing' => 0,
            'orderby' => 'code',
            'order' => 'desc',
        ]);

        return $this->languages = collect($languages)
            ->map(function ($language) {
                $item = new stdClass;
                $item->active = $language['active'];
                $item->activeAncestor = null;
                $item->title = $language['native_name'];
                $item->url = $language['url'];
                $item->label = $language['language_code'];
                $item->disabled = $language['missing'];
                $item->children = false;
                return $item;
            })
            ->toArray();
    }

    /**
     * Returns the site name.
     *
     * @return string
     */
    public function siteName()
    {
        return get_bloginfo('name', 'display');
    }
}

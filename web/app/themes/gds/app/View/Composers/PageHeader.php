<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class PageHeader extends Composer
{
    /** {@inheritdoc} */
    protected static $views = [
        'partials.page-header',
    ];

    /**
     * @return array<string,mixed>
     */
    public function override()
    {
        return [
            'page_title' => $this->title(),
        ];
    }

    public function title(): string
    {
        if (is_home()) {
            if ($home = get_option('page_for_posts', true)) {
                return get_the_title($home);
            }

            return __('Latest Posts', 'gds');
        }

        if (is_archive()) {
            return get_the_archive_title();
        }

        if (is_search()) {
            /* translators: %s is replaced with the search query */
            return sprintf(
                __('Search Results for <span class="has-black-color">%s</span>', 'gds'),
                get_search_query()
            );
        }

        if (is_404()) {
            return __('Not Found', 'gds');
        }

        return get_the_title();
    }
}

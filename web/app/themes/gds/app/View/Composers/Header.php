<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use Log1x\Navi\Navi;
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
            'current_language' => $this->currentLanguage(),
            'languages' => $this->languages(),
            'primary_navigation' => $this->primaryNavigation(),
            'is_webshop' => $this->isWebshop(),
        ];
    }

    public function currentLanguage(): ?stdClass
    {
        return collect($this->languages())
            ->first(fn ($language) => $language->current_lang);
    }

    public function languages(): array
    {
        if (!function_exists('pll_the_languages')) {
            return [];
        }
        return collect(pll_the_languages(['raw' => true]))
            ->map(fn ($language) => (object) $language)
            ->all();
    }

    public function primaryNavigation(): array
    {
        if (!has_nav_menu('primary_navigation')) {
            return [];
        }

        $navigation = (new Navi())->build('primary_navigation');

        if ($navigation->isEmpty()) {
            return [];
        }

        return $navigation->toArray();
    }

    /**
     * Show webshop menu actions if cart and checkout pages are published.
     */
    public function isWebshop(): bool
    {
        if (! function_exists('wc_get_page_id')) {
            return false;
        }

        return collect([wc_get_page_id('cart'), wc_get_page_id('checkout')])
            ->map(fn (int $pageId) => $pageId && get_post_status($pageId) === 'publish')
            ->every(fn (bool $isPublished) => $isPublished);
    }
}

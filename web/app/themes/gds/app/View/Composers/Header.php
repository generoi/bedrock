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
}

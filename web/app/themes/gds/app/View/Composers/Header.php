<?php

namespace App\View\Composers;

use Log1x\Navi\Navi;
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
            'current_language' => $this->currentLanguage(),
            'languages' => $this->languages(),
            'primary_navigation' => $this->navigation('primary_navigation'),
        ];
    }

    public function currentLanguage(): ?stdClass
    {
        return collect($this->languages())
            ->first(fn ($language) => $language->current_lang);
    }

    public function languages(): array
    {
        if (! function_exists('pll_the_languages')) {
            return [];
        }

        return collect(pll_the_languages(['raw' => true]))
            ->map(fn ($language) => (object) $language)
            ->all();
    }

    public function navigation(string $location): array
    {
        if (! has_nav_menu($location)) {
            return [];
        }

        $navigation = (new Navi)->build($location);

        if ($navigation->isEmpty()) {
            return [];
        }

        return $navigation->toArray();
    }
}

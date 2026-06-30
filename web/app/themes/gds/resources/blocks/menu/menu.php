<?php

namespace blocks\menu;

use Log1x\Navi\Navi;
use WP_Block;

$blockName = str_replace('_', '-', substr(strrchr(__NAMESPACE__, '\\'), 1));

function resolveMenuSlug(?string $menu): ?string
{
    if (empty($menu)) {
        return null;
    }

    $locations = get_nav_menu_locations();
    $location = $menu;

    if (function_exists('pll_current_language')) {
        $language = pll_current_language('slug');

        if ($language) {
            $languageLocation = "{$menu}___{$language}";

            if (! empty($locations[$languageLocation])) {
                $location = $languageLocation;
            }
        }
    }

    if (isset($locations[$location])) {
        $menuObject = wp_get_nav_menu_object($locations[$location]);

        if ($menuObject) {
            return $menuObject->slug;
        }
    }

    return $menu;
}

function navigation(string $menu): array
{
    $navigation = (new Navi)->build($menu);

    if ($navigation->isEmpty()) {
        return [];
    }

    return $navigation->toArray();
}

register_block_type(asset("blocks/$blockName/block.json")->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) use ($blockName) {
        $attributes = (object) $attributes;
        $menuSlug = resolveMenuSlug($attributes->menu ?? null);

        if (empty($menuSlug)) {
            return '';
        }

        $menu = wp_get_nav_menu_object($menuSlug);

        if (! $menu) {
            return '';
        }

        $data = [
            'attributes' => (object) array_merge((array) $attributes, ['menu' => $menuSlug]),
            'navigation' => navigation($menuSlug),
            'menu' => $menu,
            'content' => $content,
            'block' => $block,
        ];

        return view()->first([
            "blocks::$blockName.$blockName--{$menuSlug}",
            "blocks::$blockName.$blockName",
        ], $data);
    },
]);

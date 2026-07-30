<?php

namespace blocks\language_menu;

use WP_Block;

$blockName = str_replace('_', '-', substr(strrchr(__NAMESPACE__, '\\'), 1));

function languages(): array
{
    if (! function_exists('pll_the_languages')) {
        return [];
    }

    return collect(pll_the_languages(['raw' => true]))
        ->map(fn ($language) => (object) $language)
        ->all();
}

register_block_type(asset("blocks/$blockName/block.json")->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) use ($blockName) {
        if (! function_exists('pll_the_languages')) {
            return '';
        }

        $languages = languages();

        if (count($languages) <= 1) {
            return '';
        }

        return view("blocks::$blockName.$blockName", [
            'attributes' => (object) $attributes,
            'languages' => $languages,
            'content' => $content,
            'block' => $block,
        ]);
    },
]);

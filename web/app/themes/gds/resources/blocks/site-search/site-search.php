<?php

namespace blocks\site_search;

use WP_Block;

$blockName = str_replace('_', '-', substr(strrchr(__NAMESPACE__, '\\'), 1));

register_block_type(asset("blocks/$blockName/block.json")->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) use ($blockName) {
        return view("blocks::$blockName.$blockName", [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    },
]);

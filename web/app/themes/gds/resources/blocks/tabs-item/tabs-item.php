<?php

namespace blocks\tabs_item;

use WP_Block;

register_block_type(asset('blocks/tabs-item/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        return view('blocks::tabs-item.tabs-item', [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    }
]);

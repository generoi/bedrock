<?php

namespace blocks\tabs;

use WP_Block;

register_block_type(asset('blocks/tabs/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        return view('blocks::tabs.tabs', [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    }
]);

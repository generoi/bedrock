<?php

namespace blocks\tab;

use WP_Block;

register_block_type(asset('blocks/tab/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        $attributes = (object) $attributes;

        return view('blocks::tab.tab', [
            'attributes' => $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    }
]);

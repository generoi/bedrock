<?php

namespace blocks\grid;

use WP_Block;

register_block_type(asset('blocks/grid/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        return view('blocks::grid.grid', [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    }
]);

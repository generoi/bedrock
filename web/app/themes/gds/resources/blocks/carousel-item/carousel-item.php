<?php

namespace blocks\carousel_item;

use App\Assets;
use WP_Block;

register_block_type(Assets::asset('blocks/carousel-item/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        return view('blocks::carousel-item.carousel-item', [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    },
]);

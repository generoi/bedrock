<?php

namespace blocks\media_card;

use WP_Block;

register_block_type(asset('blocks/media-card/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        return view('blocks::media-card.media-card', [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    },
]);

<?php

namespace blocks\carousel;

use WP_Block;

register_block_type(asset('blocks/carousel/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        $attributes = (object) $attributes;

        return view('blocks::carousel.carousel', [
            'content' => $content,
            'align' => $attributes->align ?? '',
            'columnCount' => $attributes->columnCount ?? null,
            'ariaLabel' => $attributes->ariaLabel ?? null,
        ]);
    },
]);

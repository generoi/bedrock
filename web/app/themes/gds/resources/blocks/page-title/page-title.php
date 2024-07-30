<?php

namespace blocks\page_title;

use WP_Block;

register_block_type(asset('blocks/page-title/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content = '', $isPreview = false, int $postId = 0, ?WP_Block $block = null, array|bool $context = false) {
        $attributes = (object) $attributes;

        echo view('blocks::page-title.page-title', [
            'is_preview' => is_bool($isPreview) ? $isPreview : false,
        ]);
    },
]);

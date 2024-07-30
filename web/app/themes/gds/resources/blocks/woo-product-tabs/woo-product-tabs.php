<?php

namespace blocks\woo_product_tabs;

use WP_Block;

register_block_type(asset('blocks/woo-product-tabs/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content = '', $isPreview = false, int $postId = 0, ?WP_Block $block = null, array|bool $context = false) {
        $attributes = (object) $attributes;

        echo view('blocks::woo-product-tabs.woo-product-tabs', [
            'is_preview' => is_bool($isPreview) ? $isPreview : false,
        ]);
    },
]);

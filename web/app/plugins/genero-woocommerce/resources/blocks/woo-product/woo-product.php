<?php

use GeneroWoo\Woocommerce\Plugin;

use function Roots\asset;

register_block_type(asset('blocks/woo-product/block.json', Plugin::MANIFEST)->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        return view('genero-woocommerce-blocks::woo-product.woo-product', [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    },
]);

<?php

use GeneroWoo\Woocommerce\Plugin;

register_block_type(Plugin::getInstance()->asset('blocks/woo-product/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        return view('genero-woocommerce-blocks::woo-product.woo-product', [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    },
]);

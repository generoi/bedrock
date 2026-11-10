<?php

use GeneroWoo\Woocommerce\Plugin;

register_block_type(Plugin::getInstance()->asset('blocks/woo-product-tabs/block.json')->path(), [
    'render_callback' => function (array $attributes) {
        $attributes = (object) $attributes;
        return view('genero-woocommerce-blocks::woo-product-tabs.woo-product-tabs', [
            'attributes' => $attributes,
        ]);
    },
]);

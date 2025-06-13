<?php

use GeneroWoo\Woocommerce\Plugin;

use function Roots\asset;

register_block_type(asset('blocks/woo-product-tabs/block.json', Plugin::MANIFEST)->path(), [
    'render_callback' => function (array $attributes) {
        $attributes = (object) $attributes;
        return view('genero-woocommerce-blocks::woo-product-tabs.woo-product-tabs', [
            'attributes' => $attributes,
        ]);
    },
]);

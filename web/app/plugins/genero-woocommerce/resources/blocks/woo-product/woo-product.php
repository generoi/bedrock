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

/**
 * A product's content is its own layout (config/product-default-blocks.php). The
 * woocommerce/single-product block inside it loads the product through the Store
 * API, which renders that same content as the description, so the layout renders
 * itself until PHP runs out of memory. Skip a woo-product nested in another, the
 * way core/post-content skips a post already being rendered.
 */
$rendering = 0;

add_filter('pre_render_block', function (?string $pre, array $block) use (&$rendering) {
    if ($pre !== null || $block['blockName'] !== 'genero-woocommerce/woo-product') {
        return $pre;
    }
    if ($rendering > 0) {
        return '';
    }
    $rendering++;

    return $pre;
}, PHP_INT_MAX, 2);

add_filter('render_block_genero-woocommerce/woo-product', function (string $content) use (&$rendering) {
    $rendering--;

    return $content;
});

<?php

namespace blocks\accordion_item;

use WP_Block;

register_block_type(asset('blocks/accordion-item/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        return view('blocks::accordion-item.accordion-item', [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    }
]);

add_action('wp_enqueue_scripts', function () {
    wp_script_add_data('gds-accordion-item-script', 'strategy', 'async');
});

<?php

namespace blocks\accordion;

use WP_Block;

register_block_type(asset('blocks/accordion/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        return view('blocks::accordion.accordion', [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
        ]);
    }
]);

add_action('wp_enqueue_scripts', function () {
    wp_script_add_data('gds-accordion-item-script', 'strategy', 'async');
});

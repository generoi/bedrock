<?php

namespace blocks\tabs;

use WP_Block;

register_block_type(asset('blocks/tabs/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        return view('blocks::tabs.tabs', [
            'attributes' => (object) $attributes,
            'content' => $content,
            'block' => $block,
            'uid' => wp_unique_id(),
        ]);
    }
]);

add_action('wp_enqueue_scripts', function () {
    wp_script_add_data('gds-tabs-item-script', 'strategy', 'async');
});

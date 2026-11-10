<?php

namespace blocks\share;

use App\Assets;
use WP_Block;

register_block_type(Assets::asset('blocks/share/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        $attributes = (object) $attributes;

        return view('blocks::share.share', [
            'attributes' => $attributes,
            'content' => $content,
            'block' => $block,
            'title' => $attributes->title ?? get_the_title(),
            'url' => $attributes->url ?? get_permalink(),
            'share_id' => wp_unique_id('share'),
        ]);
    },
]);

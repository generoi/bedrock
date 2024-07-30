<?php

namespace blocks\gallery_carousel;

use WP_Block;

register_block_type(asset('blocks/gallery-carousel/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        $attributes = (object) $attributes;
        $media = collect($attributes->media ?? [])
            ->filter()
            ->values()
            ->map(fn (array $data) => (object) $data)
            ->all();

        return view('blocks::gallery-carousel.gallery-carousel', [
            'align' => $attributes->align ?? '',
            'ariaLabel' => $attributes->ariaLabel ?? '',
            'media' => $media,
            'gallery_id' => wp_unique_id('carousel-slide-'),
        ]);
    },
]);

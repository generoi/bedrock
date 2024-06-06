<?php

namespace blocks\gallery_carousel;

use WP_Block;

register_block_type(asset('blocks/gallery-carousel/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        $attributes = (object) $attributes;
        $media = collect($attributes->media ?? [])
            ->filter()
            ->values()
            ->map(function (array $data) {
                return (object) $data;
            })
            ->all();


        return view('blocks::gallery-carousel.gallery-carousel', [
            'align' => $attributes->align ?? '',
            'media' => $media,
            'gallery_id' => wp_unique_id('carousel-slide-'),
        ]);
    }
]);

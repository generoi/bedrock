<?php

namespace blocks\breadcrumb;

use WP_Block;

register_block_type(asset('blocks/breadcrumb/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content = '', bool $isPreview = false, int $postId = 0, ?WP_Block $block = null, array|bool $context = false) {
        $attributes = (object) $attributes;

        $crumbs = '';
        if (function_exists('rank_math_get_breadcrumbs')) {
            $crumbs = rank_math_get_breadcrumbs();
        } elseif (function_exists('yoast_breadcrumb')) {
            $crumbs = yoast_breadcrumb('', '', false);
        }

        echo view('blocks::breadcrumb.breadcrumb', [
            'content' => $crumbs,
            'is_preview' => $isPreview,
        ]);
    }
]);

add_filter('rank_math/frontend/breadcrumb/settings', function ($settings) {
    $settings['separator'] = '<span aria-hidden="true">&nbsp;&gt;&nbsp;</span>';
    return $settings;
});

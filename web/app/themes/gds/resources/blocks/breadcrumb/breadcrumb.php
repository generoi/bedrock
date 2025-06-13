<?php

namespace blocks\breadcrumb;

$blockName = str_replace('_', '-', substr(strrchr(__NAMESPACE__, '\\'), 1));

register_block_type(asset("blocks/{$blockName}/block.json")->path(), [
    'render_callback' => function () use ($blockName) {
        $crumbs = match (true) {
            function_exists('yoast_breadcrumb') => yoast_breadcrumb('', '', false),
            default => '',
        };

        return view("blocks::{$blockName}.{$blockName}", [
            'content' => $crumbs,
        ]);
    },
]);

add_filter('wpseo_breadcrumb_separator', function () {
    return '<span aria-hidden="true">/</span>';
});

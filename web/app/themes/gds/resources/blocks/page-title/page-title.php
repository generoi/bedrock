<?php

namespace blocks\page_title;

use function Roots\asset;

$blockName = str_replace('_', '-', substr(strrchr(__NAMESPACE__, '\\'), 1));

register_block_type(asset("blocks/{$blockName}/block.json")->path(), [
    'render_callback' => function () use ($blockName) {
        return view("blocks::{$blockName}.{$blockName}", []);
    },
]);

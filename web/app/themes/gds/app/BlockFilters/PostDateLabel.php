<?php

namespace App\BlockFilters;

class PostDateLabel
{
    public function __construct()
    {
        add_filter('render_block_core/post-date', [$this, 'renderPostDateBlock'], 10, 2);
    }

    public function renderPostDateBlock(string $content, array $block): string
    {
        $isWithLabel = str_contains($block['attrs']['className'] ?? '', 'is-style-with-label');
        if (! $isWithLabel) {
            return $content;
        }

        $label = sprintf('<span class="wp-block-post-date__label">%s</span>', __('Published:', 'gds'));

        return str_replace('<time', $label.' <time', $content);
    }
}

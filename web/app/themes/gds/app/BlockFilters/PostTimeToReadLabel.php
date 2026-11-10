<?php

namespace App\BlockFilters;

class PostTimeToReadLabel
{
    public function __construct()
    {
        add_filter('render_block_core/post-time-to-read', [$this, 'renderPostTimeToReadBlock'], 10, 2);
        add_filter('ngettext', [$this, 'alterReadingTimeMinutes'], 10, 5);
    }

    public function renderPostTimeToReadBlock(string $content, array $block): string
    {
        $isWithLabel = str_contains($block['attrs']['className'] ?? '', 'is-style-with-label');
        if (! $isWithLabel) {
            return $content;
        }

        $label = sprintf('<span class="wp-block-post-time-to-read__label">%s</span>', __('Reading time:', 'gds'));

        return preg_replace('/(<div[^>]*class="[^"]*wp-block-post-time-to-read[^"]*"[^>]*>)/', '$1'.$label.' ', $content);
    }

    public function alterReadingTimeMinutes(string $translation, string $single, string $plural, int $number, string $domain): string
    {
        // Only the post-time-to-read block's string, which is in core's domain.
        if ($domain !== 'default' || $single !== '%s minute' || $plural !== '%s minutes') {
            return $translation;
        }

        /* translators: %s: the number of minutes it takes to read the post */
        return __('%s min', 'gds');
    }
}

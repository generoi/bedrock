<?php

namespace App\BlockFilters;

class QueryLoopHideEmpty
{
    public function __construct()
    {
        add_filter('render_block_core/query', [$this, 'filterQuery'], 10, 2);
        add_filter('render_block_core/group', [$this, 'filterGroup'], 10, 2);
    }

    public function filterQuery(string $html, array $block): string
    {
        if (wp_is_rest_endpoint()) {
            return $html;
        }

        // A query whose "no results" block has content says what to show when
        // it is empty.
        foreach ($block['innerBlocks'] ?? [] as $inner) {
            if ($inner['blockName'] === 'core/query-no-results' && $inner['innerBlocks']) {
                return $html;
            }
        }

        // Strip the outer query wrapper and check whether post-template
        // rendered any actual post content inside it.
        if (preg_match('/class="[^"]*wp-block-post-template[^"]*"[^>]*>(.*?)<\/(?:ul|div)>/s', $html, $m)) {
            if (trim($m[1]) !== '') {
                return $html;
            }
        }

        return '';
    }

    public function filterGroup(string $html, array $block): string
    {
        if (wp_is_rest_endpoint()) {
            return $html;
        }

        // Extract content between the outer wrapper tags. If the group's
        // inner blocks all rendered empty, hide the entire group.
        if (preg_match('/^<[^>]+>(.*)<\/[^>]+>$/s', trim($html), $m)) {
            if (trim($m[1]) === '') {
                return '';
            }
        }

        return $html;
    }
}

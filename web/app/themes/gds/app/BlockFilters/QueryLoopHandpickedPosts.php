<?php

namespace App\BlockFilters;

use WP_Block;

class QueryLoopHandpickedPosts
{
    public function __construct()
    {
        add_filter('query_loop_block_query_vars', [$this, 'queryLoopHandpickedPosts'], 10, 2);
    }

    /**
     * Support `include` in query loop block (used by handpicked-posts filter).
     */
    public function queryLoopHandpickedPosts(array $query, WP_Block $block): array
    {
        if (empty($block->context['query']['include'])) {
            return $query;
        }

        $query['post__in'] = $block->context['query']['include'];
        $query['orderby'] = 'post__in';
        $query['order'] = 'DESC';

        return $query;
    }
}

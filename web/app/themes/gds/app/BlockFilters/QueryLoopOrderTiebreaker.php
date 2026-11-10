<?php

namespace App\BlockFilters;

/**
 * Give every Query Loop a deterministic tiebreaker.
 *
 * Ordering by date alone leaves posts published in the same second in whatever
 * order MySQL happens to return them, so the same listing renders in a
 * different order between requests: cards swap places, page caches store
 * whichever order was rendered first, and visual regression tests compare a
 * page against a reshuffled copy of itself.
 */
class QueryLoopOrderTiebreaker
{
    public function __construct()
    {
        add_filter('query_loop_block_query_vars', [$this, 'filterQueryVars']);
    }

    public function filterQueryVars(array $query): array
    {
        if (($query['orderby'] ?? 'date') !== 'date') {
            return $query;
        }

        $order = $query['order'] ?? 'DESC';
        $query['orderby'] = ['date' => $order, 'ID' => $order];

        return $query;
    }
}

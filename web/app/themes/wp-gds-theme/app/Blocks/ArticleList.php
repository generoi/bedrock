<?php

namespace App\Blocks;

use WP_Query;

class ArticleList extends Block
{
    public $name = 'Article List';
    public $description = 'Show a list of articles...';
    public $category = 'widgets';
    public $icon = 'format-aside';
    public $keywords = ['news', 'uutiset', 'artikkelit'];
    public $mode = 'preview';
    public $align = 'wide';
    public $supports = [
        'align' => ['full', 'wide'],
        'mode' => false,
    ];

    public function with()
    {
        return [
            'query' => $this->query(),
            'use_pagination' => get_field('use_pagination'),
        ];
    }

    public function query(): WP_Query
    {
        $query = $this->buildQuery();
        $cid = substr(md5(json_encode($query)), 0, 8);
        $cache = wp_cache_get($cid);
        if (!$cache) {
            $cache = new WP_Query($query);
            wp_cache_set($cid, $cache);
        }

        return $cache;
    }

    public function buildQuery(): array
    {
        $query = [
            'posts_per_page' => (int) get_field('posts_per_page') ?: 3,
            'order_by' => get_field('order_by') ?: ['date'],
            'order' => get_field('order') ?: 'DESC',
            'post_type' => 'post',
            'use_pagination' => get_field('use_pagination') ?? false,
            'ignore_sticky_posts' => get_field('ignore_sticky_posts') ?? false,
            'post_status' => 'publish',
            'paged' => get_field('use_pagination') ? (get_query_var('paged') ?: 1) : null,
        ];

        if ($categories = get_field('category')) {
            $query['tax_query'][] = [
                'taxonomy' => 'category',
                'terms' => $categories,
            ];
        }

        return $query;
    }

    public function render($block, $content = '', $preview = false, $post = 0)
    {
        if (!$this->query()->have_posts()) {
            if (is_bool($preview) && $preview) {
                return '<div class="acf-block-placeholder text-center">' . __('No results found...') . '</div>';
            }
            return '';
        }

        return parent::render(...func_get_args());
    }
}

<?php

namespace blocks\article_grid;

use StoutLogic\AcfBuilder\FieldsBuilder;
use WP_Block;
use WP_Query;

register_block_type(asset('blocks/article-grid/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content = '', bool $isPreview = false, int $postId = 0, ?WP_Block $block = null, array|bool $context = false) {
        $attributes = (object) $attributes;

        $query = [
            'posts_per_page' => get_field('posts_per_page') ?: 12,
            'orderby' => ['date'],
            'order' => 'DESC',
            'post_type' => 'post',
            'ignore_sticky_posts' => false,
            'post_status' => 'publish',
            'paged' => get_field('use_pagination') ? (get_query_var('paged') ?: 1) : null,
        ];

        if ($categories = get_field('category')) {
            $query['tax_query'][] = [
                'taxonomy' => 'category',
                'terms' => $categories,
            ];
        }
        echo view('blocks::article-grid.article-grid', [
            'align' => $attributes->align ?? '',
            'query' => $attributes->query ?? new WP_Query($query),
            'use_pagination' => $attributes->use_pagination ?? get_field('use_pagination'),
        ]);
    }
]);

$fields = new FieldsBuilder('article-grid');
$fields->addRadio('type', ['layout' => 'horizontal'])
    ->addChoices('automatic', 'manual')
    ->addRelationship('post__in', [
        'label' => 'Manually picked posts',
        'min' => 1,
        'return_format' => 'id',
        'filters' => ['search', 'taxonomy'],
        'post_type' => ['post'],
    ])
        ->conditional('type', '==', 'manual')
    ->addTaxonomy('category', [
        'taxonomy' => 'category',
        'field_type' => 'select',
    ])
        ->conditional('type', '==', 'automatic')
    ->addNumber('posts_per_page', [
        'label' => 'Posts per page',
        'instructions' => 'If you set this to -1 it will display all posts, be careful since this could cause performance problems.',
        'placeholder' => 12,
        'min' => -1,
        'max' => 50,
    ])
        ->conditional('type', '==', 'automatic')
        ->setWidth('50%')
    ->addTrueFalse('use_pagination', [
        'label' => '',
        'message' => 'Show pagination',
    ])
        ->conditional('type', '==', 'automatic')
        ->setWidth('50%')
    ->setLocation('block', '==', 'gds/article-grid');

if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group($fields->build());
}

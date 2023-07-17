<?php

namespace App\blocks\ArticleGrid;

use App\blocks\Block;
use StoutLogic\AcfBuilder\FieldsBuilder;
use WP_Block;
use WP_Query;

class ArticleGrid extends Block
{
    public function render(
        array $attributes,
        string $content = '',
        $isPreview = false,
        int $postId = 0,
        ?WP_Block $block = null,
        array|bool $context = false
    ): void
    {
        $attributes = (object) $attributes;

        $query = [
            'posts_per_page' => get_field('posts_per_page') ?: 12,
            'orderby' => ['date'],
            'order' => 'DESC',
            'post_type' => 'product',
            'ignore_sticky_posts' => false,
            'post_status' => 'publish',
            'post__not_in' => [get_the_ID()],
        ];

        if ($postIn = get_field('post__in')) {
            $query['post__in'] = $postIn;
            $query['orderby'] = 'post__in';
            $query['order'] = 'ASC';
            $query['ignore_sticky_posts'] = true;
        } elseif ($categories = get_field('product_cat')) {
            $query['tax_query'][] = [
                'taxonomy' => 'product_cat',
                'terms' => $categories,
            ];
        }

        echo $this->view([
            'align' => $attributes->align ?? '',
            'query' => $attributes->query ?? new WP_Query($query),
        ]);
    }

    protected function fields(): ?FieldsBuilder
    {
        $fields = new FieldsBuilder('article-grid');
        $fields->addRadio('type', ['layout' => 'horizontal'])
            ->addChoices('automatic', 'manual')
            ->addRelationship('post__in', [
                'label' => 'Manually picked articles',
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
                ->setWidth('50%');
        return $fields;
    }
}


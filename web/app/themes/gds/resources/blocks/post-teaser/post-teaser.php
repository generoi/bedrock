<?php

namespace blocks\post_teaser;

use Illuminate\Support\Facades\View;
use WP_Block;

register_block_type(asset('blocks/post-teaser/block.json')->path(), [
    'render_callback' => function (array $attributes, string $content, WP_Block $block) {
        $attributes = (object) $attributes;

        $postId = $attributes->postId ?? $block->context['postId'] ?? null;
        $postType = $attributes->postType ?? $block->context['postType'] ?? get_post_type($postId);
        if (! $postId) {
            return '';
        }

        $originalPost = $GLOBALS['post'];
        $post = get_post($postId);
        $GLOBALS['post'] = $post;
        setup_postdata($GLOBALS['post']);

        $content = View::first(["blocks::post-teaser.variations.$postType", 'blocks::post-teaser.variations.post-teaser'], [
            'attributes' => $attributes,
            'content' => $content,
            'block' => $block,
        ])->render();

        $GLOBALS['post'] = $originalPost;
        wp_reset_postdata();

        return $content;
    }
]);

add_action('rest_api_init', function () {
    $postTypes = collect(get_post_types(['public' => true]))
        ->except(['attachment'])
        ->values()
        ->all();

    register_rest_field($postTypes, 'rendered_post_teaser', [
        'get_callback' => function (array $object) {
            $content = render_block([
                'blockName' => 'gds/post-teaser',
                'attributes' => [
                    'postId' => $object['id'],
                    'postType' => $object['type'],
                ],
            ]);
            return $content;
        },
        'schema' => [
            'type' => 'string',
        ],
    ]);
});

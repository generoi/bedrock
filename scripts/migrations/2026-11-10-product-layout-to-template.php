<?php

/**
 * Products' content is their description again: the layout moved into the
 * theme's woocommerce/content-single-product view.
 *
 * Until 2026-11, genero-woocommerce gave every new product its page layout as
 * content (genero-woocommerce/woo-product > woocommerce/single-product). This
 * removes that wrapper and keeps every block outside it. A product whose
 * woo-product holds anything beside the standard single-product layout is
 * listed and skipped: move those blocks into the template or the description
 * by hand.
 *
 * Run: ddev wp eval-file - < scripts/migrations/2026-11-10-product-layout-to-template.php
 * Applies by default; pass `dry-run` to only list the changes. Idempotent.
 */
$apply = ($args[0] ?? '') !== 'dry-run';

$isWhitespace = static fn (array $block): bool => ($block['blockName'] ?? null) === null
    && trim($block['innerHTML']) === '';

$ids = get_posts([
    'post_type' => 'product',
    'post_status' => ['publish', 'draft', 'pending', 'private', 'future'],
    'numberposts' => -1,
    'fields' => 'ids',
    'lang' => '',
    'include_hidden_products' => true,
]);

$changed = 0;
foreach ($ids as $id) {
    $post = get_post($id);
    $blocks = parse_blocks($post->post_content);
    $kept = [];
    $extra = [];
    $found = false;

    foreach ($blocks as $block) {
        if ($block['blockName'] !== 'genero-woocommerce/woo-product') {
            $kept[] = $block;

            continue;
        }
        $found = true;
        foreach ($block['innerBlocks'] as $inner) {
            if (! $isWhitespace($inner) && $inner['blockName'] !== 'woocommerce/single-product') {
                $extra[] = $inner['blockName'] ?? 'freeform HTML';
            }
        }
    }

    if (! $found) {
        continue;
    }
    if ($extra) {
        WP_CLI::warning("#{$post->ID} {$post->post_name}: woo-product also holds ".implode(', ', array_unique($extra)).'; not changed');

        continue;
    }

    $new = trim(serialize_blocks(array_values(array_filter($kept, static fn ($b) => ! $isWhitespace($b)))));
    WP_CLI::log("#{$post->ID} {$post->post_name}: layout removed, ".($new === '' ? 'no description left' : strlen($new).' bytes of description kept'));
    $changed++;

    if ($apply) {
        $result = wp_update_post(wp_slash(['ID' => $post->ID, 'post_content' => $new]), true);
        if (is_wp_error($result)) {
            WP_CLI::warning("#{$post->ID}: ".$result->get_error_message());
        }
    }
}

WP_CLI::log(($apply ? 'Saved' : 'Would save')." {$changed} products.");

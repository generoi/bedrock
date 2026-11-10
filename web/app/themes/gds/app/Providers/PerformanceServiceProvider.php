<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use WP_Block_Type_Registry;

class PerformanceServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * Each block's stylesheet loads only on pages that render the block.
         *
         * @see https://make.wordpress.org/core/2021/07/01/block-styles-loading-enhancements-in-wordpress-5-8/
         */
        add_filter('should_load_separate_core_block_assets', '__return_true');
        // Run AFTER BlockServiceProvider::enqueueBlockStyles (priority 10)
        // so the theme's `sage/block/{collection-name}` handles are
        // registered by the time we try to enqueue them.
        add_action('wp_enqueue_scripts', [$this, 'earlyEnqeueueBlockStyles'], 11);

        add_action('wp_print_styles', [$this, 'dequeueAssets'], 100);
        add_filter('styles_inline_size_limit', fn () => 60_000);
    }

    /**
     * Always enqueue stylesheets for the following blocks in the <head>, so
     * what is above the fold doesn't wait for core to hoist the styles it
     * enqueued while rendering the body.
     */
    public function earlyEnqeueueBlockStyles(): void
    {
        self::enqueueBlockStyles('core/heading');
        self::enqueueBlockStyles('core/paragraph');

        if (function_exists('is_woocommerce')) {
            wp_enqueue_style('sage/block/woocommerce-store-notices');

            if (is_shop() || is_product_taxonomy()) {
                self::enqueueBlockStyles('woocommerce/product-collection');
                self::enqueueBlockStyles('woocommerce/product-template');
            }

            if (is_singular('product')) {
                self::enqueueBlockStyles('core/columns');
                self::enqueueBlockStyles('core/column');
                self::enqueueBlockStyles('woocommerce/product-price');
                self::enqueueBlockStyles('core/post-title');
                self::enqueueBlockStyles('core/post-excerpt');
                if (($post = get_post()) && $post->post_content && has_block('gds/gallery-carousel', $post)) {
                    self::enqueueBlockStyles('gds/gallery-carousel');
                }
            }
        }

        // Enqueue the styles of the first block's tree on singular posts.
        if (is_singular() && ($post = get_post())) {
            if ($blocks = parse_blocks($post->post_content)) {
                $firstName = $blocks[0]['blockName'] ?? '';
                if (! in_array($firstName, ['gravityforms/form', 'woocommerce/store-notices'], true)) {
                    self::enqueueBlockTreeStyles($blocks[0]);
                }
            }
        }
    }

    /**
     * Enqueue every frontend stylesheet declared by a block type. Reads
     * `style_handles` + `view_style_handles` from the registry — both
     * core block stylesheets (registered via block.json) and the theme's
     * `sage/block/...` overrides land there, since BlockServiceProvider
     * mirrors its handles into the registry after `wp_enqueue_block_style`.
     */
    private static function enqueueBlockStyles(string $blockName): void
    {
        $type = WP_Block_Type_Registry::get_instance()->get_registered($blockName);
        if (! $type) {
            return;
        }
        $handles = array_merge(
            (array) ($type->style_handles ?? []),
            (array) ($type->view_style_handles ?? []),
        );
        foreach ($handles as $handle) {
            if (is_string($handle) && $handle !== '') {
                wp_enqueue_style($handle);
            }
        }
    }

    /**
     * Recursively enqueue stylesheets for a parsed block and every nested
     * inner block, without rendering it.
     *
     * @param  array<string, mixed>  $block
     */
    private static function enqueueBlockTreeStyles(array $block): void
    {
        if (! empty($block['blockName'])) {
            self::enqueueBlockStyles((string) $block['blockName']);
        }
        foreach ((array) ($block['innerBlocks'] ?? []) as $inner) {
            if (is_array($inner)) {
                self::enqueueBlockTreeStyles($inner);
            }
        }
    }

    public function dequeueAssets(): void
    {
        if (is_admin() || is_customize_preview() || is_admin_bar_showing()) {
            return;
        }

        wp_deregister_style('dashicons'); // wp core
    }
}

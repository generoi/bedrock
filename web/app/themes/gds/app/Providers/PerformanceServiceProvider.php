<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

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
         * @see https://make.wordpress.org/core/2021/07/01/block-styles-loading-enhancements-in-wordpress-5-8/
         */
        add_filter('should_load_separate_core_block_assets', '__return_true');
        add_action('wp_enqueue_scripts', [$this, 'earlyEnqeueueBlockStyles'], 9);

        add_action('wp_enqueue_scripts', [$this, 'replaceWithModernJquery']);
        add_action('wp_enqueue_scripts', [$this, 'maybeRemoveJquery'], 100);
        add_action('wp_print_styles', [$this, 'dequeueAssets'], 100);
    }

    /**
     * Always enqueue stylesheets for the following blocks in the <head>
     */
    public function earlyEnqeueueBlockStyles(): void
    {
        render_block(['blockName' => 'core/heading']);
        render_block(['blockName' => 'core/paragraph']);

        if (function_exists('is_woocommerce')) {
            wp_style_add_data('wc-blocks-packages-style', 'async', true);
            wp_style_add_data('wc-blocks-style', 'async', true);
            wp_style_add_data('wc-blocks-style-mini-cart-contents', 'async', true);

            // Load essential mini cart styles, not _all_ assets
            wp_enqueue_style('wc-blocks-style-mini-cart');
            wp_enqueue_style('sage/block/woocommerce-mini-cart');

            render_block(['blockName' => 'woocommerce/customer-account', 'attrs' => []]);

            if (is_shop() || is_product_taxonomy()) {
                render_block(['blockName' => 'woocommerce/product-collection', 'attrs' => []]);
                render_block(['blockName' => 'woocommerce/product-template', 'attrs' => []]);
            }

            if (is_singular('product')) {
                render_block(['blockName' => 'woocommerce/store-notices', 'attrs' => []]);
                render_block(['blockName' => 'woocommerce/product-rating', 'attrs' => []]);
                render_block(['blockName' => 'woocommerce/product-price', 'attrs' => []]);
                render_block(['blockName' => 'woocommerce/product-sku', 'attrs' => []]);
                render_block(['blockName' => 'woocommerce/add-to-cart-form', 'attrs' => []]);
                render_block(['blockName' => 'core/post-terms', 'attrs' => []]);
                render_block(['blockName' => 'gds/gallery-carousel', 'attrs' => []]);
            }
        }

        // Enqeueue stylesheets of the firt block.
        if (is_singular() && $post = get_post()) {
            if ($blocks = parse_blocks($post->post_content)) {
                render_block($blocks[0]);
            }
        }
    }

    public function maybeRemoveJquery(): void
    {
        $doRemovejQuery = collect([
            // Has gravityform
            wp_script_is('gform_gravityforms', 'enqueued'),
            // Sees administration bar
            is_admin() || current_user_can('edit_posts'),
            // WooCommerce pages
            function_exists('is_woocommerce') && (is_woocommerce() || is_checkout() || is_cart()),
        ])->filter()->isEmpty();

        if ($doRemovejQuery) {
            wp_deregister_script('jquery');
        }
    }

    /**
     * Replace core jQuery with theme's jQuery.
     */
    public function replaceWithModernJquery(): void
    {
        wp_deregister_script('jquery');
        wp_deregister_script('jquery-core');
        wp_deregister_script('jquery-migrate');
        wp_register_script('jquery', asset('scripts/jquery.js')->uri(), false, null, true);
    }

    public function dequeueAssets(): void
    {
        if (! is_admin_bar_showing()) {
            wp_deregister_style('dashicons'); // wp core
        }
    }
}

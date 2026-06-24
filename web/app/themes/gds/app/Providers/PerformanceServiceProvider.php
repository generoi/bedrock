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
        add_filter('should_load_separate_core_block_assets', '__return_false');
        // add_action('wp_enqueue_scripts', [$this, 'earlyEnqeueueBlockStyles'], 9);

        add_action('wp_enqueue_scripts', [$this, 'replaceWithModernJquery']);
        add_action('wp_enqueue_scripts', [$this, 'maybeRemoveJquery'], 100);
        add_action('wp_print_styles', [$this, 'dequeueAssets'], 100);
        add_filter('styles_inline_size_limit', fn () => 60_000);
    }

    /**
     * Always enqueue stylesheets for the following blocks in the <head>
     */
    public function earlyEnqeueueBlockStyles(): void
    {
        render_block(['blockName' => 'core/heading']);
        render_block(['blockName' => 'core/paragraph']);
        render_block(['blockName' => 'core/buttons']);
        render_block(['blockName' => 'core/button']);

        if (function_exists('is_woocommerce')) {
            wp_enqueue_style('sage/block/woocommerce-store-notices');

            if (is_shop() || is_product_taxonomy()) {
                render_block(['blockName' => 'woocommerce/product-collection', 'attrs' => []]);
                render_block(['blockName' => 'woocommerce/product-template', 'attrs' => []]);
            }

            if (is_singular('product')) {
                render_block(['blockName' => 'core/columns', 'attrs' => []]);
                render_block(['blockName' => 'core/column', 'attrs' => []]);
                render_block(['blockName' => 'woocommerce/product-price', 'attrs' => []]);
                render_block(['blockName' => 'core/post-title', 'attrs' => []]);
                render_block(['blockName' => 'core/post-excerpt', 'attrs' => []]);
                // Default product template uses WooCommerce gallery, not gds/gallery-carousel;
                // rendering that block here ran full carousel logic on every product page load.
                if (($post = get_post()) && $post->post_content && has_block('gds/gallery-carousel', $post)) {
                    render_block(['blockName' => 'gds/gallery-carousel', 'attrs' => []]);
                }
            }
        }

        // Enqueue styles from the first block on singular posts. Skip `product`: the first block is
        // almost always `genero-woocommerce/woo-product` (full single-product tree). Rendering it
        // here duplicates the entire layout during wp_enqueue_scripts and can exhaust memory (1G+).
        // Product pages already trigger the WooCommerce block renders above.
        if (is_singular() && ! is_singular('product') && ($post = get_post())) {
            if ($blocks = parse_blocks($post->post_content)) {
                $firstName = $blocks[0]['blockName'] ?? '';
                if (! in_array($firstName, ['gravityforms/form', 'woocommerce/store-notices'], true)) {
                    render_block($blocks[0]);
                }
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
        // jQuery must not use `defer`: wp-util and WooCommerce (e.g. add-to-cart-variation) load in
        // the same batch; deferred jQuery runs after non-deferred deps → "jQuery is not defined",
        // then wp.template (from wp-util) never attaches.
        wp_register_script('jquery', asset('jquery.min.js')->uri(), [], null, ['in_footer' => true]);
    }

    public function dequeueAssets(): void
    {
        if (! is_admin_bar_showing()) {
            wp_deregister_style('dashicons'); // wp core
        }
    }
}

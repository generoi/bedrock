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
            // WooCommerce cart or checkout
            function_exists('is_checkout') && (is_checkout() || is_cart()),
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
        wp_register_script('jquery', asset('jquery.min.js')->uri(), false, null, true);
    }

    public function dequeueAssets(): void
    {
        if (! is_admin_bar_showing()) {
            wp_deregister_style('dashicons'); // wp core
        }
    }
}

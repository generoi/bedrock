<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class WooCommerceServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if (! function_exists('is_woocommerce')) {
            return;
        }

        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
        add_filter('body_class', [$this, 'addBodyClasses']);
        add_filter('woocommerce_product_tabs', [$this, 'filterProductTabs']);
        add_action('woocommerce_init', [$this, 'removeGlobalTemplateHooks']);
        add_action('woocommerce_init', [$this, 'removeSingleProductTemplateHooks']);
        add_action('woocommerce_archive_description', [$this, 'printArchiveContent']);
    }

    public function removeGlobalTemplateHooks(): void
    {
        // Remove wrappers
        remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper');
        remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end');

        // Remove breadcrumb
        remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);

        // Archive
        remove_action('woocommerce_before_shop_loop', 'woocommerce_output_all_notices', 10);
        remove_action('woocommerce_shop_loop_header', 'woocommerce_product_taxonomy_archive_header');
        remove_action('woocommerce_archive_description', 'woocommerce_taxonomy_archive_description', 10);
        remove_action('woocommerce_archive_description', 'woocommerce_product_archive_description', 10);
        remove_action('woocommerce_no_products_found', 'wc_no_products_found');
    }

    public function removeSingleProductTemplateHooks(): void
    {
        remove_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20);
        remove_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_sale_flash');
        remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);
        remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10);
        remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);
        remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20);
        remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30);
        remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40);
        remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_sharing', 50);
        remove_action('woocommerce_before_single_product', 'woocommerce_output_all_notices', 10);

        remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10);
        // remove_action('woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15);
        // remove_action('woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20);
    }

    public function printArchiveContent(): void
    {
        if (is_post_type_archive('product')) {
            $page = get_post(wc_get_page_id('shop'));
            echo apply_filters('the_content', $page->post_content);
        }
    }

    /**
     * Remove description tab since we print it above the tabs
     */
    public function filterProductTabs(array $tabs): array
    {
        unset($tabs['description']);
        return $tabs;
    }

    /**
     * Add a magic class which disables all WooCommerce default button styles.
     */
    public function addBodyClasses(array $classes): array
    {
        $classes[] = 'woocommerce-block-theme-has-button-styles';
        return $classes;
    }

    public function enqueueAssets(): void
    {
        wp_enqueue_style('sage/woocommerce.css', asset('styles/woocommerce.css')->uri(), ['woocommerce-general'], null);

        // Do not use select2 on edit address page
        wp_dequeue_script('selectWoo');
        wp_dequeue_style('select2');
    }
}

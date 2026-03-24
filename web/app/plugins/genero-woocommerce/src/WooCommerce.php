<?php

namespace GeneroWoo\Woocommerce;

use WC_Product;
use WC_Product_Variable;
use WP_REST_Request;
use WP_REST_Response;

class WooCommerce
{
    public function init(): void
    {
        if (! defined('WC_VERSION')) {
            return;
        }

        add_filter('use_block_editor_for_post_type', [$this, 'useBlockEditor'], 10, 2);
        add_filter('woocommerce_taxonomy_args_product_cat', [$this, 'setShowInRest']);
        add_filter('woocommerce_taxonomy_args_product_tag', [$this, 'setShowInRest']);

        add_filter('woocommerce_product_tabs', [$this, 'filterProductTabs']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
        add_filter('body_class', [$this, 'addBodyClasses']);
        add_action('woocommerce_init', [$this, 'removeGlobalTemplateHooks']);
        add_action('woocommerce_init', [$this, 'removeSingleProductTemplateHooks']);
        add_action('woocommerce_archive_description', [$this, 'printArchiveContent']);
        add_filter('woocommerce_get_price_html', [$this, 'changeVariablePriceDisplay'], 10, 2);
        add_filter('doing_it_wrong_trigger_error', [$this, 'fixWooCommerceWidgetsEditor'], 10, 4);
        add_filter('woocommerce_enqueue_styles', [$this, 'dequeueStylesheets']);
        add_filter('woocommerce_admin_get_feature_config', [$this, 'filterFeatures']);

        // Prevent server-side block rendering on REST edit requests. The block editor
        // uses content.raw (not content.rendered) for editing; rendering the full
        // WooCommerce block tree (gallery, single-product, add-to-cart…) was causing
        // 10+ second REST responses.
        add_filter('rest_prepare_product', [$this, 'skipRenderedContentInEditContext'], 10, 3);
    }

    public function setShowInRest(array $objectType): array
    {
        $objectType['show_in_rest'] = true;

        return $objectType;
    }

    public function useBlockEditor(bool $use, string $postType): bool
    {
        return $postType === 'product' ? true : $use;
    }

    /**
     * Apply default block template from config/product-default-blocks.php for new products.
     *
     * @see https://developer.wordpress.org/reference/functions/register_post_type/#template
     */
    public function registerProductBlockTemplate(array $args, string $postType): array
    {
        if ($postType !== 'product') {
            return $args;
        }

        $file = dirname(__DIR__).'/config/product-default-blocks.php';
        if (! is_readable($file)) {
            return $args;
        }

        $template = require $file;
        if (! is_array($template) || $template === []) {
            return $args;
        }

        $args['template'] = $template;

        return $args;
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
        $classes[] = 'woocommerce-uses-block-theme';

        return $classes;
    }

    /**
     * @see https://github.com/woocommerce/woocommerce/issues/47831
     *
     * WooCommerce Blocks can output `loading="lazy"` and `fetchpriority="high"` on the same img; core
     * calls `_doing_it_wrong()` (WP 6.3.0). Acorn turns that into a fatal ErrorException — suppress
     * only that notice, no HTML filters.
     */
    public function fixWooCommerceWidgetsEditor(bool $trigger, string $functionName, string $message, string $version = ''): bool
    {
        if ($functionName === 'wp_enqueue_script()' && str_contains($message, '"wp-editor"')) {
            return false;
        }

        if (
            $version === '6.3.0'
            && in_array($functionName, ['wp_get_loading_optimization_attributes', 'wp_img_tag_add_loading_optimization_attrs'], true)
        ) {
            return false;
        }

        return $trigger;
    }

    public function dequeueStylesheets(array $styles): array
    {
        unset($styles['woocommerce-general']);
        unset($styles['woocommerce-layout']);
        unset($styles['woocommerce-smallscreen']);

        return $styles;
    }

    public function enqueueAssets(): void
    {
        $isWooCommercePage = (
            is_account_page() ||
            is_cart() ||
            is_checkout() ||
            is_order_received_page() ||
            is_checkout_pay_page() ||
            is_woocommerce()
        );
        $hasRatingsBlock = (
            has_block('woocommerce/product-rating') ||
            has_block('woocommerce/all-reviews') ||
            has_block('woocommerce/reviews-by-category') ||
            has_block('woocommerce/reviews-by-product')
        );

        if ($isWooCommercePage || $hasRatingsBlock) {
            wp_enqueue_style('genero-woocommerce/woocommerce.css');
        }

        // Do not use select2 on edit address page
        wp_dequeue_script('selectWoo');
        wp_dequeue_style('select2');
    }

    public function filterFeatures(array $features): array
    {
        // Adds custom fonts to the site
        unset($features['launch-your-store']);

        return $features;
    }

    /**
     * Skip expensive server-side block rendering in the REST edit context.
     *
     * WordPress populates `content.rendered` by running `do_blocks()` on the raw
     * post content, which renders the entire WooCommerce block tree (gallery,
     * single-product, add-to-cart…) on every GET/POST to the editor REST endpoint.
     * The block editor only uses `content.raw` for editing; clearing `rendered` in
     * edit context has no effect on the editing experience but avoids the expensive
     * render pass that was causing 10+ second REST responses.
     */
    public function skipRenderedContentInEditContext(WP_REST_Response $response, $post, WP_REST_Request $request): WP_REST_Response
    {
        if ($request->get_param('context') === 'edit' && isset($response->data['content']['rendered'])) {
            $response->data['content']['rendered'] = '';
        }

        return $response;
    }

    /**
     * Change price display for Variable Products
     */
    public function changeVariablePriceDisplay(string $price, WC_Product $productObj): string
    {
        if (! ($productObj instanceof WC_Product_Variable)) {
            return $price;
        }

        $minPrice = $productObj->get_variation_price('min', true);

        // Translators: %s is the lowest variation price.
        $price = sprintf(__('Starting from: %s', 'genero-woocommerce'), wc_price($minPrice));

        return $price;
    }
}

<?php

namespace GeneroWoo\Woocommerce;

use WC_Product;
use WC_Product_Variable;

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
        add_filter('woocommerce_enqueue_styles', [$this, 'dequeueStylesheets']);
        add_filter('pre_option_woocommerce_show_marketplace_suggestions', [$this, 'disableMarketplaceSuggestions']);

        add_action('pre_get_posts', [$this, 'excludeHiddenProducts']);

        add_filter('woocommerce_has_block_template', [$this, 'hasSingleProductTemplate'], 10, 2);
        add_action('init', [$this, 'editProductsInTemplate'], 20);
    }

    /**
     * Product pages render the theme's templates/single-product.html.
     * WooCommerce only looks for its own registered block templates, which
     * exist in block themes alone, and otherwise swaps in its PHP template;
     * tell it the theme has one.
     */
    public function hasSingleProductTemplate(bool $hasTemplate, string $templateName): bool
    {
        return $templateName === 'single-product' ? true : $hasTemplate;
    }

    /**
     * Edit products inside their template, so editors see the whole page and
     * click into the description. Core hides the "Show template" toggle outside
     * block themes, but honours the post type's default mode.
     */
    public function editProductsInTemplate(): void
    {
        add_post_type_support('product', 'editor', ['default-mode' => 'template-locked']);
    }

    /**
     * WooCommerce applies catalogue visibility to its own archive and to
     * product-collection blocks with a stock filter, but not to core/query
     * loops or the REST and AJAX requests that render listings, so a product
     * hidden from the catalogue still shows up there. Apply it to every
     * frontend product query.
     *
     * WP-CLI is left alone: importers and audits look products up and have to
     * see the hidden ones. Other lookups that need hidden products pass
     * `include_hidden_products`.
     */
    public function excludeHiddenProducts(\WP_Query $query): void
    {
        if ((defined('WP_CLI') && WP_CLI) || $query->get('include_hidden_products')) {
            return;
        }

        if ((is_admin() && ! wp_doing_ajax()) || $query->is_singular() || ! function_exists('wc_get_product_visibility_term_ids')) {
            return;
        }

        if (! in_array('product', (array) $query->get('post_type'), true)) {
            return;
        }

        $visibilityTermIds = wc_get_product_visibility_term_ids();
        $excluded = $query->is_search()
            ? $visibilityTermIds['exclude-from-search']
            : $visibilityTermIds['exclude-from-catalog'];

        if (! $excluded) {
            return;
        }

        $taxQuery = (array) $query->get('tax_query');
        $taxQuery[] = [
            'taxonomy' => 'product_visibility',
            'field' => 'term_taxonomy_id',
            'terms' => [$excluded],
            'operator' => 'NOT IN',
        ];
        $query->set('tax_query', $taxQuery);
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

        // WP 6.7+ warns when the `woocommerce` textdomain loads before `init`, which
        // third-party code commonly triggers indirectly. The message is translated, so
        // match on the function, version and domain only.
        if (
            $functionName === '_load_textdomain_just_in_time'
            && $version === '6.7.0'
            && str_contains($message, '<code>woocommerce</code>')
        ) {
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

    /**
     * Turn off WooCommerce's phone-home suggestions. Since WooCommerce 11.1 the
     * remote inbox notifications, free extension recommendations and payment
     * gateway suggestions are no longer feature flags; this option is what
     * stops them fetching specs from woocommerce.com and wordpress.com on admin
     * page loads and background queue runs. Configured gateways are unaffected.
     */
    public function disableMarketplaceSuggestions(): string
    {
        return 'no';
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

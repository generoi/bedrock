<?php

namespace App\components\WooCommerce;

use GeneroWP\ImageResizer\Rewriters\Preload;

class WooCommerce
{
    public function __construct()
    {
        if (!function_exists('WC')) {
            return;
        }

        add_action('wp_head', [$this, 'preloadGalleryImage'], 7);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
        add_action('wp_enqueue_scripts', [$this, 'dequeueScripts']);
        add_action('wp_print_styles', [$this, 'dequeueStyles']);
        add_filter('use_block_editor_for_post_type', [$this, 'useBlockEditor'], 10, 2);
        add_filter('woocommerce_taxonomy_args_product_cat', [$this, 'showInRest']);
        add_filter('woocommerce_taxonomy_args_product_tag', [$this, 'showInRest']);
        add_filter('woocommerce_register_post_type_product', [$this, 'setCustomTemplate']);
        add_filter('woocommerce_enqueue_styles', '__return_empty_array');
        add_filter('sage-woocommerce/templates', [$this, 'addKlarnaTemplates']);
        add_filter('woocommerce_kses_notice_allowed_tags', [$this, 'filterCustomSanitizeTags']);
        add_filter('woocommerce_cart_totals_coupon_html', [$this, 'filterCouponHtml']);
    }

    /**
     * Preload the first gallery image.
     */
    public function preloadGalleryImage(): void
    {
        if (class_exists(Preload::class) && is_product()) {
            $image = get_the_post_thumbnail(get_the_ID(), 'large', false, [
                'sizes' => '(max-width: 670px) 100vw, (max-width: 1200px) 50vw, 537px',
            ]);
            echo Preload::buildLink($image) . PHP_EOL;
        }
    }

    protected function enqueueBundle(string $path, $dependencies = []): void
    {
        $script = asset("$path.js");
        if ($script->exists()) {
            wp_enqueue_script("sage/$path.js", $script->uri(), $dependencies, null);
            wp_script_add_data("sage/$path.js", 'async', true);
        }

        $stylesheet = asset("$path.css");
        if ($stylesheet->exists()) {
            wp_enqueue_style("sage/$path.css", $stylesheet->uri(), array_merge($dependencies, ['sage/app.css']), null);
            wp_style_add_data("sage/$path.css", 'path', $stylesheet->path());
        }
    }

    /**
     * Register custom per-page stylesheets which get enqueued separately.
     */
    public function enqueueAssets(): void
    {
        // Site wide generic scripts and styles
        $this->enqueueBundle('components/WooCommerce/woocommerce');

        // Product page
        if (is_product()) {
            $this->enqueueBundle('components/WooCommerce/single-product');
            $this->enqueueBundle('components/WooCommerce/single-product-' . wc_get_product()->get_type());
        }
        // Cart page
        if (is_cart()) {
            $this->enqueueBundle('components/WooCommerce/cart');
            $this->enqueueBundle('components/WooCommerce/cart-checkout');
            $this->enqueueBundle('components/WooCommerce/order-details');
            $this->enqueueBundle('components/WooCommerce/coupon');
            $this->enqueueBundle('components/WooCommerce/progress-bar');
        }
        // Checkout page
        if (is_checkout() || is_checkout_pay_page()) {
            $this->enqueueBundle('components/WooCommerce/checkout');
            $this->enqueueBundle('components/WooCommerce/cart-checkout');
            $this->enqueueBundle('components/WooCommerce/form-fields');
            $this->enqueueBundle('components/WooCommerce/order-details');
            $this->enqueueBundle('components/WooCommerce/coupon');
            $this->enqueueBundle('components/WooCommerce/progress-bar');

            $gateways = WC()->payment_gateways()->get_available_payment_gateways();
            if (isset($gateways['kco'])) {
                $this->enqueueBundle('components/WooCommerce/klarna-checkout', ['kco']);
            }
        }
        // Thank you page
        if (is_order_received_page()) {
            $this->enqueueBundle('components/WooCommerce/order-details');
            $this->enqueueBundle('components/WooCommerce/progress-bar');
            $this->enqueueBundle('components/WooCommerce/customer-details');
        }

        // Account pages
        if (is_account_page()) {
            $this->enqueueBundle('components/WooCommerce/account');
            $this->enqueueBundle('components/WooCommerce/form-fields');
            $this->enqueueBundle('components/WooCommerce/order-details');
            $this->enqueueBundle('components/WooCommerce/customer-details');
        }

        if (is_shop() || is_product_taxonomy()) {
            $this->enqueueBundle('components/WooCommerce/archive');
        }
    }

    /**
     * Dequeue core scripts
     */
    public function dequeueScripts(): void
    {
        // Product/Archive scripts
        wp_deregister_script('wc-single-product');
        wp_deregister_script('wc-add-to-cart');
        wp_deregister_script('wc-add-to-cart-variation');

        // Extra
        wp_deregister_script('selectWoo');

        if (! is_checkout() && ! is_cart()) {
            // Cart scripts
            wp_deregister_script('wc-cart');
            wp_deregister_script('wc-cart-fragments');

            // Checkout scripts
            wp_deregister_script('jquery-blockui');
            wp_deregister_script('wc-country-select');
            wp_deregister_script('wc-address-i18n');
            wp_deregister_script('wc-checkout');

            // General woo script
            wp_deregister_script('jquery-blockui');
            wp_deregister_script('woocommerce');
        }
    }

    public function useBlockEditor(bool $use, string $postType): bool
    {
        return $postType === 'product' ? true : $use;
    }

    public function showInRest(array $objectType): array
    {
        $objectType['show_in_rest'] = true;
        return $objectType;
    }

    public function setCustomTemplate(array $args): array
    {
        $args['template'] = [
            ['core/paragraph'],
        ];
        unset($args['template_lock']);
        return $args;
    }

    public function dequeueStyles(): void
    {
        //wp_dequeue_script('wc-country-select');
        //wp_dequeue_script('selectWoo');
        wp_dequeue_style('select2');

        // Replace Woo Commerce generic stylesheet with our own
        wp_deregister_style('wc-blocks-style');
        $stylesheet = asset('components/WooCommerce/wc-block-styles.css');
        wp_register_style('wc-blocks-style', $stylesheet->uri(), [], null);
        wp_style_add_data('wc-blocks-style', 'path', $stylesheet->path());
    }

    /**
     * Add integrations with Klarna
     */
    public function addKlarnaTemplates(array $paths): array
    {
        if (defined('KCO_WC_PLUGIN_PATH')) {
            $paths[] = KCO_WC_PLUGIN_PATH . '/templates/';
        }
        if (defined('WC_DIBS_PATH')) {
            $paths[] = WC_DIBS_PATH . '/templates/';
        }
        return $paths;
    }

    public function filterCustomSanitizeTags(array $tags): array
    {
        $tags['toast-notice'] = [
            'class' => true,
            'auto-close' => true,
        ];
        $tags['toggle-button'] = [
            'id' => true,
            'class' => true,
            'aria-haspopup' => true,
            'aria-controls' => true,
        ];
        foreach ($tags as $idx => $tag) {
            $tags[$idx]['slot'] = true;
        }
        return $tags;
    }

    public function filterCouponHtml (string $html): string
    {
        $html = str_replace(
            __('[Remove]', 'woocommerce'),
            sprintf('<i class="fa-regular fa-trash" title="%s"></i>', __('Remove', 'gds')),
            $html,
        );
        return $html;
    }
}

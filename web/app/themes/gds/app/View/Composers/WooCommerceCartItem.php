<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use WC_Product;

class WooCommerceCartItem extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'woocommerce.partials.cart-item',
    ];

    /**
     * @see https://github.com/woocommerce/woocommerce/blob/trunk/plugins/woocommerce/templates/cart/cart.php
     *
     * @return array
     */
    public function with()
    {
        $key = $this->view->key;
        $item = $this->view->item;
        $product = apply_filters('woocommerce_cart_item_product', $item['data'], $item, $key);
        $productId = apply_filters('woocommerce_cart_item_product', $item['product_id'], $item, $key);
        $productName = apply_filters( 'woocommerce_cart_item_name', $product->get_name(), $item, $key);

        $permalink = apply_filters('woocommerce_cart_item_permalink', $product->is_visible() ? $product->get_permalink($item) : '', $item, $key);
        $thumbnail = apply_filters('woocommerce_cart_item_thumbnail', $product->get_image(), $item, $key);
        $price = apply_filters('woocommerce_cart_item_price', WC()->cart->get_product_price($product), $item, $key);
        $subtotal = apply_filters('woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal($product, $item['quantity'] ), $item, $key);

        $isOnBackorder = $product->backorders_require_notification() && $product->is_on_backorder($item['quantity']);
        $backorderNotification = $isOnBackorder ? apply_filters(
            'woocommerce_cart_item_backorder_notification',
            '<p class="backorder_notification">' . esc_html__('Available on backorder', 'woocommerce') . '</p>',
            $productId
        ) : '';
        $isSoldIndividually = $product->is_sold_individually();

        return [
            'product' => $product,
            'product_name' => $productName,
            'product_id' => $productId,
            'permalink' => $permalink,
            'sku' => $product->get_sku(),
            'thumbnail' => $thumbnail,
            'quantity' => $item['quantity'],
            'price' => $price,
            'subtotal' => $subtotal,
            'min_quantity' => $isSoldIndividually ? 1 : 0,
            'max_quantity' => $isSoldIndividually ? 1 : $product->get_max_purchase_quantity(),
            'remove_url' => wc_get_cart_remove_url($key),
            'backorder_notification' => $backorderNotification,
        ];
    }
}

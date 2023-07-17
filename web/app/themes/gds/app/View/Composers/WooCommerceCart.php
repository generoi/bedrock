<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use WC_Product;

class WooCommerceCart extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'woocommerce.cart.cart',
    ];

    /**
     * @return array
     */
    public function with()
    {
        return [
            'cart' => $this->cart(),
        ];
    }

    /**
     * @see https://github.com/woocommerce/woocommerce/blob/trunk/plugins/woocommerce/templates/cart/cart.php
     */
    public function cart(): array
    {
        $cart = collect(WC()->cart->get_cart())
            ->filter(function ($item, $key) {
                /** @var WC_Product $product */
                $product = apply_filters('woocommerce_cart_item_product', $item['data'], $item, $key);
                if (!$product || !$product->exists()) {
                    return false;
                }
                if ($item['quantity'] <= 0 || !apply_filters('woocommerce_cart_item_visible', true, $item, $key)) {
                    return false;
                }
                return true;
            })
            ->all();

        return $cart;
    }
}

<?php

namespace App\components\CartIcon;

class CartIcon
{
    const COOKIE_CART_COUNT = 'wp_user_cart_count';

    public function __construct()
    {
        if (!function_exists('WC')) {
            return;
        }

        add_action('woocommerce_set_cart_cookies', [$this, 'updateCartCount']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
    }

    public function updateCartCount(bool $set): void
    {
        if ($set) {
            \wc_setcookie(
                self::COOKIE_CART_COUNT,
                \WC()->cart->get_cart_contents_count(),
            );
        } else {
            \wc_setcookie(self::COOKIE_CART_COUNT, 0, time() - YEAR_IN_SECONDS);
            unset($_COOKIE[self::COOKIE_CART_COUNT]);
        }
    }

    public function enqueueAssets(): void
    {
        $script = asset('components/CartIcon/cart-icon.js');
        wp_enqueue_script("sage/CartIcon/cart-icon.js", $script->uri(), [], null);
        wp_script_add_data("sage/CartIcon/cart-icon.js", 'async', true);

        $stylesheet = asset('components/CartIcon/cart-icon.css');
        wp_enqueue_style("sage/CartIcon/cart-icon.css", $stylesheet->uri(), ['sage/app.css'], null);
        wp_style_add_data("sage/CartIcon/cart-icon.css", 'path', $stylesheet->path());
    }
}

<?php
/*
Plugin Name:        Genero WooCommerce
Plugin URI:         http://genero.fi
Description:        WooCommerce extensions
Version:            1.0.0
Author:             Genero
Author URI:         http://genero.fi/
License:            MIT License
License URI:        http://opensource.org/licenses/MIT
*/

use GeneroWoo\Woocommerce\Plugin;

if (! is_blog_installed()) {
    return;
}

Plugin::getInstance();

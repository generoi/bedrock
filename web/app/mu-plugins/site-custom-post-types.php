<?php
/*
Plugin Name:  Site: Register Post Types
Plugin URI:   https://genero.fi
Description:  Register Post Types and Taxonomies for site
Version:      1.0.0
Author:       Genero
Author URI:   https://genero.fi/
License:      MIT License
*/

namespace Genero\Site;

use PostTypes\PostType;

if (!is_blog_installed()) {
    return;
}

/**
 * Register custom post types and taxonomies with WP.
 *
 * @see https://github.com/jjgrainger/PostTypes
 * @see https://developer.wordpress.org/resource/dashicons/
 */
class CustomPostTypes
{
    private static $instance = null;

    /** @var array */
    public $postTypes = [];

    public static function getInstance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Register all post types and their taxonomies.
     */
    public function init()
    {
        $this->postTypes[] = $this->registerPost();
        $this->postTypes[] = $this->registerPage();
        // $this->postTypes[] = $this->registerProduct();
    }

    public function registerPost()
    {
        $post = new PostType('post');

        return $post;
    }

    public function registerPage()
    {
        $page = new PostType('page');

        return $page;
    }

    public function registerProduct()
    {
        $product = new PostType('product');
        // @see https://github.com/jjgrainger/PostTypes/issues/12
        $product->columns()->populate('product_cat', '__return_null');
        $product->columns()->populate('product_type', '__return_null');

        return $product;
    }
}

CustomPostTypes::getInstance()->init();

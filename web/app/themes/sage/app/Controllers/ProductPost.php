<?php

/**
 * @file
 * Contains App\Controllers\ProductPost class used for WooCommerce products.
 */

namespace App\Controllers;

use App;
use Timber;
use TimberHelper;
use WC_Product_Variable;

class ProductPost extends Post
{
    use Traits\Reviewable;

    /** @var WC_Product $product Product object */
    public $product;
    /** @var array $attributes Product attributes */
    public $attributes;
    /** @var bool $in_stock */
    public $in_stock;

    /** @inheritdoc */
    public function __construct($pid = null)
    {
        parent::__construct($pid);

        $this->product = WC()->product_factory->get_product($this->ID);
        $this->in_stock = $this->product->is_in_stock();
    }

    /**
     * Get product categories.
     *
     * @return Term[]
     */
    public function categories()
    {
        if (!isset($this->categories)) {
            $this->categories = $this->terms('product_cat');
        }
        return $this->categories;
    }

    /**
     * Get product tags.
     *
     * @return Term[]
     */
    public function tags()
    {
        if (!isset($this->tags)) {
            $this->tags = $this->terms('product_tag');
        }
        return $this->tags;
    }

    /**
     * Get product attributes.
     *
     * @param string $name Attribute type or null for all
     * @return array
     */
    public function attributes($name = null)
    {
        if (!isset($this->attributes)) {
            $this->attributes = [];
            $attributes = $this->product->get_attributes();
            foreach ($attributes as $idx => $attribute) {
                if ($attribute->is_taxonomy()) {
                    $this->attributes[$idx] = $this->get_terms($attribute->get_name());
                } else {
                    $this->attributes[$idx] = $attribute->get_options();
                }
            }
        }
        if (isset($name)) {
            return isset($this->attributes[$name]) ? $this->attributes[$name] : null;
        }
        return $this->attributes;
    }

    /**
     * Get product tabs.
     *
     * @return array
     */
    public function tabs()
    {
        $tabs = [];
        $tabs = apply_filters('woocommerce_product_tabs', $tabs);

        // Remove default tabs.
        // $tabs = array_diff_key($tabs, array_flip([
        //     'additional_information',
        // ]));

        // Fill content.
        foreach ($tabs as $name => $tab) {
            $tabs[$name]['name'] = $name;
            $tabs[$name]['title'] = apply_filters('woocommerce_product_' . $name . '_tab_title', $tab['title']);

            if (isset($tab['callback'])) {
                $tabs[$name]['content'] = Timber\Helper::ob_function($tab['callback'], [$name, $tab]);
            }

            $context = $tabs[$name];
            $context['post'] = $this;

            $tabs[$name]['content'] = Timber::fetch([
                'product/tab--' . $name . '.twig',
                'product/tab.twig',
            ], $context);
        }

        $this->tabs = $tabs;

        return $this->tabs;
    }

    /**
     * Get upsell products.
     *
     * @return Post[]
     */
    public function upsell_products()
    {
        if (isset($this->upsell_products)) {
            return $this->upsell_products;
        }

        $cid = $this->generate_cid('upsell');
        $product = $this->product;

        $this->upsell_products = TimberHelper::transient($cid, function () use ($product) {
            return (new Timber\PostQuery($product->get_upsell_ids()))->get_posts();
        }, $this->cache_duration);

        return $this->upsell_products;
    }

    /**
     * Get related products.
     *
     * @return Post[]
     */
    public function related_products($posts_per_page = 4, $orderby = 'rand', $order = 'desc')
    {
        $cid = $this->generate_cid('related', func_get_args());

        if (!isset($this->related_products)) {
            $this->related_products = [];
        }
        if (isset($this->related_products[$cid])) {
            return $this->related_products[$cid];
        }

        $product = $this->product;
        $this->related_products[$cid] = TimberHelper::transient($cid, function () use ($product, $posts_per_page, $orderby, $order) {
            // Get visble related products then sort them at random.
            $related_products = array_filter(array_map('wc_get_product', wc_get_related_products($product->get_id(), $posts_per_page, $product->get_upsell_ids())), 'wc_products_array_filter_visible');
            $related_products = wc_products_array_orderby($related_products, $orderby, $order);
            foreach ($related_products as $idx => $related) {
                $related_products[$idx] = Timber\PostGetter::get_post($related->get_id());
            }
            return $related_products;
        }, $this->cache_duration);

        return $this->related_products[$cid];
    }

    /**
     * Set the global product from the loop. This needs to run before a product
     * template is rendered.
     */
    public function set_loop_product()
    {
        $GLOBALS['product'] = $this->product;
    }

    /** @inheritdoc */
    protected function generate_cid($prefix, $args = [])
    {
        // Cache by product id rather than post id.
        return $prefix . '_' . $this->product->get_id() . '_' . substr(md5(json_encode($args)), 0, 6);
    }
}

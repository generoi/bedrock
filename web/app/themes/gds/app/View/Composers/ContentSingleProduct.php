<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use WC_Product;
use WP_Post;
use WP_Query;

class ContentSingleProduct extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'woocommerce.content-single-product',
    ];

    /**
     * @return array
     */
    public function with()
    {
        $post = get_post();

        return [
            'upsell_products' => $this->upsellProducts($post),
            'related_products' => $this->relatedProducts($post),
            'gallery' => $this->gallery($post),
            'tabs' => $this->tabs($post),
            'additional_information' => $this->additionalInformation($post),
            'sku' => $this->sku($post),
            'weight' => $this->weight($post),
            'dimensions' => $this->dimensions($post),
            'category_list' => $this->categoryList($post),
        ];
    }

    public function sku(WP_Post $post): string
    {
        if (!wc_product_sku_enabled()) {
            return '';
        }
        return $this->product($post)->get_sku();
    }

    public function weight(WP_Post $post): string
    {
        $product = $this->product($post);
        if (!apply_filters('wc_product_enable_dimensions_display', $product->has_weight())) {
            return '';
        }
        return wc_format_weight($product->get_weight());
    }

    public function dimensions(WP_Post $post): string
    {
        $product = $this->product($post);
        if (!apply_filters('wc_product_enable_dimensions_display', $product->has_dimensions())) {
            return '';
        }
        return wc_format_dimensions($product->get_dimensions(false));
    }

    public function categoryList(WP_Post $post): string
    {
        return wc_get_product_category_list($post->ID);

    }

    public function additionalInformation(WP_Post $post): string
    {
        $product = $this->product($post);
        $hasEnabledDimensions = apply_filters('wc_product_enable_dimensions_display', $product->has_weight() || $product->has_dimensions());
		if ($hasEnabledDimensions) {
            return '';
        }

        ob_start();
        do_action('woocommerce_product_additional_information', $this->product(($post)));
        return ob_end_clean();
    }

    public function tabs(WP_Post $post): array
    {
        $tabs = collect(apply_filters('woocommerce_product_tabs', []))
            ->reject(fn (array $tabs, string $key) => in_array($key, [
                'description',
                'additional_information'
            ]))
            ->filter(fn (array $tab) => isset($tab['callback']))
            ->map(function (array $tab, string $key) {
                $tab['title'] = apply_filters(sprintf('woocommerce_product_%s_tab_title', $key), $tab['title'], $key);
                return $tab;
            })
            ->all();


        return $tabs;
    }

    public function gallery(WP_Post $post): array
    {
        $product = $this->product($post);

        return collect($product->get_gallery_image_ids())
            ->prepend($product->get_image_id())
            ->filter()
            ->values()
            ->map(function (int $attachmentId) {
                return (object) [
                    'ID' => $attachmentId,
                    'src' => wp_get_attachment_image_url($attachmentId, 'thumbnail'),
                    'srcset' => wp_get_attachment_image_srcset($attachmentId),
                ];
            })
            ->all();
    }

    public function upsellProducts(WP_Post $post): ?WP_Query
    {
        $ids = $this->product($post)->get_upsell_ids();
        if (! $ids) {
            return null;
        }

        return new WP_Query([
            'post_type' => 'product',
            'posts_per_page' => -1,
            'post__in' => $ids,
        ]);
    }

    public function relatedProducts(WP_Post $post): ?WP_Query
    {
        $ids = wc_get_related_products($post->ID, 10, []);
        if (! $ids) {
            return null;
        }

        return new WP_Query([
            'post_type' => 'product',
            'posts_per_page' => -1,
            'post__in' => $ids,
        ]);
    }

    protected function product(WP_Post $post): WC_Product
    {
        return wc_get_product($post);
    }
}

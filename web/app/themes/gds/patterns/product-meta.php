<?php

/**
 * Title: Product meta
 * Slug: gds/product-meta
 * Inserter: no
 *
 * SKU, categories and tags under the add-to-cart form in
 * templates/single-product.html. A pattern so the labels can be translated.
 */
?>
<!-- wp:woocommerce/product-meta -->
<div class="wp-block-woocommerce-product-meta"><!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:woocommerce/product-sku /-->

<!-- wp:post-terms <?php echo wp_json_encode(['term' => 'product_cat', 'prefix' => __('Category: ', 'gds')]); ?> /-->

<!-- wp:post-terms <?php echo wp_json_encode(['term' => 'product_tag', 'prefix' => __('Tags: ', 'gds')]); ?> /--></div>
<!-- /wp:group --></div>
<!-- /wp:woocommerce/product-meta -->

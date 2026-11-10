{{--
  The template for displaying product content in the single-product.php template

  This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.

  HOWEVER, on occasion WooCommerce will need to update template files and you
  (the theme developer) will need to copy the new files to your theme to
  maintain compatibility. We try to do this as little as possible, but it does
  happen. When this occurs the version of the template file will be bumped and
  the readme will list any important changes.

  The layout is WooCommerce's block template (templates/blockified/single-product.html)
  and the product's own content is its description, as in a block theme.

  @see     https://woocommerce.com/document/template-structure/
  @package WooCommerce\Templates
  @version 3.6.0
--}}

@php
  global $product;
@endphp

@if (!has_block('gds/breadcrumb'))
  @block('gds/breadcrumb')
@endif

@php
  do_action('woocommerce_before_single_product');
@endphp

@if (post_password_required())
  {!! get_the_password_form() !!}
@else
  <div id="product-{{ get_the_ID() }}" @php(wc_product_class('', $product))>
    @blocks
      <!-- wp:woocommerce/store-notices /-->

      <!-- wp:columns {"align":"wide"} -->
      <div class="wp-block-columns alignwide">
        <!-- wp:column -->
        <div class="wp-block-column">
          <!-- wp:woocommerce/product-gallery {"layout":{"type":"flex","flexWrap":"nowrap","orientation":"vertical"}} -->
          <div
            class="wp-block-woocommerce-product-gallery wc-block-product-gallery">
            <!-- wp:woocommerce/product-gallery-large-image -->
            <div
              class="wp-block-woocommerce-product-gallery-large-image wc-block-product-gallery-large-image__inner-blocks">
              <!-- wp:woocommerce/product-image {"showProductLink":false,"showSaleBadge":false,"isDescendentOfSingleProductTemplate":true} /-->
              <!-- wp:woocommerce/product-sale-badge {"align":"right"} /-->
              <!-- wp:woocommerce/product-gallery-large-image-next-previous /-->
            </div>
            <!-- /wp:woocommerce/product-gallery-large-image -->
            <!-- wp:woocommerce/product-gallery-thumbnails /-->
          </div>
          <!-- /wp:woocommerce/product-gallery -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column">
          <!-- wp:post-title {"level":1,"__woocommerceNamespace":"woocommerce/product-query/product-title"} /-->
          <!-- wp:woocommerce/product-rating {"isDescendentOfSingleProductTemplate":true} /-->
          <!-- wp:woocommerce/product-price {"isDescendentOfSingleProductTemplate":true,"fontSize":"large"} /-->
          <!-- wp:post-excerpt {"__woocommerceNamespace":"woocommerce/product-query/product-summary","excerptLength":100} /-->
          <!-- wp:woocommerce/add-to-cart-form {"quantitySelectorStyle":"stepper"} /-->

          <!-- wp:woocommerce/product-meta -->
          <div class="wp-block-woocommerce-product-meta">
            <!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
            <div class="wp-block-group">
              <!-- wp:woocommerce/product-sku /-->
              <!-- wp:post-terms @json(['term' => 'product_cat', 'prefix' => __('Category: ', 'gds')]) /-->
              <!-- wp:post-terms @json(['term' => 'product_tag', 'prefix' => __('Tags: ', 'gds')]) /-->
            </div>
            <!-- /wp:group -->
          </div>
          <!-- /wp:woocommerce/product-meta -->
        </div>
        <!-- /wp:column -->
      </div>
      <!-- /wp:columns -->
    @endblocks

    @php
      the_content();
    @endphp

    @block('genero-woocommerce/woo-product-tabs')

    @php
      do_action('woocommerce_after_single_product_summary');
    @endphp
  </div>

  @php
    do_action('woocommerce_after_single_product');
  @endphp
@endif

{{--
  The template for displaying product content in the single-product.php template

  This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.

  HOWEVER, on occasion WooCommerce will need to update template files and you
  (the theme developer) will need to copy the new files to your theme to
  maintain compatibility. We try to do this as little as possible, but it does
  happen. When this occurs the version of the template file will be bumped and
  the readme will list any important changes.

  @see     https://woocommerce.com/document/template-structure/
  @package WooCommerce\Templates
  @version 3.6.0
--}}

@php
  global $product;
@endphp

@php
  do_action('woocommerce_before_single_product');
@endphp

@block('core/columns', [])
@block('core/column', [])

@php
  $gallery = collect([
      $product->get_image_id(),
      ...$product->get_gallery_image_ids(),
  ])
      ->filter()
      ->map(fn(int $id) => ['id' => $id])
      ->all();
@endphp

@if (post_password_required())
  {!! get_the_password_form() !!}
@else
  @blocks
    <!-- wp:woocommerce/single-product {"productId": {{ $product->get_id() }}} -->
    <div
      {!! wc_product_class('is-root-container', $product) !!}
      id="main-content"
      tabindex="-1"
    >
      <!-- wp:woocommerce/store-notices /-->

      <div
        class="wp-block-columns is-layout-flex are-vertically-aligned-top alignwide is-style-media-text"
      >
        <div class="wp-block-column">
          <!-- wp:gds/gallery-carousel @json(['media' => $gallery]) /-->
          @php
            do_action('woocommerce_before_single_product_summary');
          @endphp
        </div>
        <div class="wp-block-column">
          <!-- wp:core/post-title {"level": 2} /-->
          <!-- wp:woocommerce/product-rating {"isDescendentOfSingleProductBlock": true} /-->
          <!-- wp:woocommerce/product-price {"isDescendentOfSingleProductBlock": true} /-->
          <!-- wp:core/post-excerpt /-->
          <!-- wp:woocommerce/add-to-cart-form {"isDescendentOfSingleProductBlock": false} /-->

          <!-- wp:woocommerce/product-meta -->
          <!-- wp:woocommerce/product-sku /-->
          <!-- wp:core/post-terms {"term": "product_cat", "separator": ""} /-->
          <!-- /wp:woocommerce/product-meta -->
          @php
            do_action('woocommerce_single_product_summary');
          @endphp
        </div>
      </div>

      @php
        the_content();
      @endphp

      <!-- wp:gds/woo-product-tabs /-->
      @php
        do_action('woocommerce_after_single_product_summary');
      @endphp
    </div>
    <!-- /wp:woocommerce/single-product -->
  @endblocks

  @php
    do_action('woocommerce_after_single_product');
  @endphp
@endif

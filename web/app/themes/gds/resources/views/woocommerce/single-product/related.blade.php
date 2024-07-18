{{--
/**
 * Related Products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/related.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     3.9.0
 */
--}}

@if ($related_products)
	<section class="related products alignwide">
    @php $heading = apply_filters('woocommerce_product_related_products_heading', __('Related products', 'woocommerce')) @endphp
		@if ($heading)
			<h2>{!! esc_html($heading) !!}</h2>
		@endif

    @blocks
      <!-- wp:gds/carousel {"columnCount":3} -->
      @foreach ($related_products as $product)
        <!-- wp:gds/carousel-item -->
          <!-- wp:gds/post-teaser {"postId": {{ $product->get_id() }}, "postType":"product"} /-->
        <!-- /wp:gds/carousel-item -->
      @endforeach
      <!-- /wp:gds/carousel -->
    @endblocks
  </section>
@endif

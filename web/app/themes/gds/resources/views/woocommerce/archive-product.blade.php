{{--
The Template for displaying product archives, including the main shop page which is a post type archive

This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.

HOWEVER, on occasion WooCommerce will need to update template files and you
(the theme developer) will need to copy the new files to your theme to
maintain compatibility. We try to do this as little as possible, but it does
happen. When this occurs the version of the template file will be bumped and
the readme will list any important changes.

@see https://docs.woocommerce.com/document/template-structure/
@package WooCommerce/Templates
@version 3.3.9
--}}

@extends('layouts.app')

@section('content')
  @php
    do_action('get_header', 'shop');
    do_action('woocommerce_before_main_content');
    do_action('woocommerce_shop_loop_header');
  @endphp

  @if (woocommerce_product_loop())
    @if (apply_filters('woocommerce_show_page_title', true))
      @include('partials.page-header')
    @endif

    {{-- Prints the content --}}
    @php do_action('woocommerce_archive_description') @endphp

    @php
      $page = is_post_type_archive('product') ? get_post(wc_get_page_id('shop')) : null;
    @endphp

    {{-- Skip the default loop template if there's a product-collection block --}}
    @if (! $page || ! has_block('woocommerce/product-collection', $page))
      @blocks
        <!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between"}} -->
        <div class="wp-block-group alignwide">
          @php
            do_action('woocommerce_before_shop_loop');
            // @note This adds loop/loop-start.php template which we do not want
            // woocommerce_product_loop_start();
          @endphp
        </div>
        <!-- /wp:group -->
        <!-- wp:woocommerce/store-notices /-->
        <!-- wp:woocommerce/product-collection {"query":{"inherit":true},"displayLayout":{"type":"flex","columns":3,"shrinkColumns":true},"collection":"woocommerce/product-collection/product-catalog"} -->
        <div class="wp-block-woocommerce-product-collection alignwide">
          <!-- wp:woocommerce/product-template -->
            <!-- wp:gds/post-teaser /-->
          <!-- /wp:post-template -->

          <!-- wp:query-pagination -->
            <!-- wp:query-pagination-previous /-->
            <!-- wp:query-pagination-numbers /-->
            <!-- wp:query-pagination-next /-->
          <!-- /wp:query-pagination -->
        </div>
        <!-- /wp:woocommerce/product-collection -->
      @endblocks

      @php
        // @note This adds loop/loop-end.php template which we do not want
        // woocommerce_product_loop_end();

        do_action('woocommerce_after_shop_loop');
      @endphp
    @endif
  @else
    <x-not-found>
      <x-slot name="header">
        @include('partials.page-header')
      </x-slot>
    </x-not-found>

    @php do_action('woocommerce_no_products_found') @endphp
  @endif

  @php
    do_action('woocommerce_after_main_content');
    do_action('get_sidebar', 'shop');
    do_action('get_footer', 'shop');
  @endphp
@endsection

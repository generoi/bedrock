{{--
  Single Product tabs

  This template can be overridden by copying it to yourtheme/woocommerce/single-product/tabs/tabs.php.

  HOWEVER, on occasion WooCommerce will need to update template files and you
  (the theme developer) will need to copy the new files to your theme to
  maintain compatibility. We try to do this as little as possible, but it does
  happen. When this occurs the version of the template file will be bumped and
  the readme will list any important changes.

  @see     https://woocommerce.com/document/template-structure/
  @package WooCommerce\Templates
  @version 3.8.0
--}}

@php
  /**
   * Filter tabs and allow third parties to add their own.
   *
   * Each tab is an array containing title, callback and priority.
   *
   * @see woocommerce_default_product_tabs()
   */
  $product_tabs = apply_filters('woocommerce_product_tabs', []);
@endphp

@if (!empty($product_tabs))
  @blocks
    <!-- wp:gds/accordion {"className": "woocommerce-tabs"} -->
    @foreach ($product_tabs as $key => $product_tab)
      @php
        $label = wp_kses_post(
            apply_filters(
                'woocommerce_product_' . $key . '_tab_title',
                $product_tab['title'],
                $key,
            ),
        );
      @endphp

      <!-- wp:gds/accordion-item {"label":"{{ esc_attr($label) }}"} -->
      @if (isset($product_tab['callback']))
        @php
          call_user_func($product_tab['callback'], $key, $product_tab);
        @endphp
      @endif

      <!-- /wp:gds/accordion-item -->
    @endforeach

    <!-- /wp:gds/accordion -->
  @endblocks

  @php
    do_action('woocommerce_product_after_tabs');
  @endphp
@endif

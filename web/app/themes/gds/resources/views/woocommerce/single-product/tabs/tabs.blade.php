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
    <!-- wp:accordion {"className":"woocommerce-tabs"} -->
    <div role="group" class="wp-block-accordion woocommerce-tabs">
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

        <!-- wp:accordion-item -->
        <div class="wp-block-accordion-item">
          <!-- wp:accordion-heading {"level":3} -->
          <h3 class="wp-block-accordion-heading">
            <button type="button" class="wp-block-accordion-heading__toggle">
              <span
                class="wp-block-accordion-heading__toggle-title">{!! $label !!}</span>
              <span class="wp-block-accordion-heading__toggle-icon"
                aria-hidden="true">+</span>
            </button>
          </h3>
          <!-- /wp:accordion-heading -->
          <!-- wp:accordion-panel -->
          <div role="region" class="wp-block-accordion-panel">
            @if (isset($product_tab['callback']))
              @php
                call_user_func($product_tab['callback'], $key, $product_tab);
              @endphp
            @endif
          </div>
          <!-- /wp:accordion-panel -->
        </div>
        <!-- /wp:accordion-item -->
      @endforeach
    </div>
    <!-- /wp:accordion -->
  @endblocks

  @php
    do_action('woocommerce_product_after_tabs');
  @endphp
@endif

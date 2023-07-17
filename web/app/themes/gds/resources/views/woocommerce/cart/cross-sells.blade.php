{{--
/**
 * Cross-sells
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cross-sells.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 4.4.0
 */
--}}

@if (! $cross_sells)
  @php return @endphp
@endif

<div class="cross-sells">
  @if ($heading = apply_filters('woocommerce_product_cross_sells_products_heading', __('You may be interested in&hellip;', 'woocommerce')))
    <h2>{!! esc_html($heading) !!}</h2>
  @endif

  @block('gds/product-carousel', [
    'use_pagination' => true,
    'query' => new WP_Query([
      'post_type' => 'product',
      'post__in' => collect($cross_sells)->map(fn ($product) => $product->get_id())->all()
    ]),
    'align' => 'wide',
  ])
</div>

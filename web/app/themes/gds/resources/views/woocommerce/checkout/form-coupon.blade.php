{{--
/**
 * Checkout coupon form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-coupon.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.0.1
 */
--}}

@if (! wc_coupons_enabled())
  @php return @endphp
@endif

<sub-form class="{{-- checkout_coupon --}}woocommerce-form-coupon" method="post">
  <p>{!! esc_html('If you have a coupon code, please apply it below.', 'woocommerce') !!}</p>

  @include('woocommerce.partials.coupon-form')
</sub-form>

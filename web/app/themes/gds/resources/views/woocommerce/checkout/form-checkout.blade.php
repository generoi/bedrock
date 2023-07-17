{{--
/**
 * Checkout Form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-checkout.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.0
 */
--}}

@extends('layouts.app')

@section('content')
  @php do_action('woocommerce_before_checkout_form', $checkout) @endphp

  @php do_action('woocommerce_checkout_login_form') @endphp

  {{-- If checkout registration is disabled and not logged in, the user cannot checkout. --}}
  @if (! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in())
    {!! esc_html(apply_filters('woocommerce_checkout_must_be_logged_in_message', __('You must be logged in to checkout.', 'woocommerce'))) !!}
    @php return @endphp
  @endif

  <form
    name="checkout"
    method="post"
    class="cart-checkout-page cart-checkout-page--checkout alignwide checkout woocommerce-checkout"
    action="{{ wc_get_checkout_url() }}"
    enctype="multipart/form-data"
  >
    <div class="cart-checkout-page__progress-bar">
      @include('woocommerce.partials.progress-bar')
    </div>

    <div class="cart-checkout-page__title">
      @if (!str_contains(get_the_content(), '</h1>'))
        @include('partials.page-header')
      @endif
    </div>

    <div class="cart-checkout-page__content is-container">
      @php woocommerce_checkout_coupon_form() @endphp

      @if ($checkout->get_checkout_fields())
        @php do_action('woocommerce_checkout_before_customer_details') @endphp

        <div class="checkout-details" id="customer_details">
          @php do_action('woocommerce_checkout_billing') @endphp
          @php do_action('woocommerce_checkout_shipping') @endphp
        </div>

        @php do_action('woocommerce_checkout_after_customer_details') @endphp
      @endif
    </div>
    <div class="cart-checkout-page__sidebar">
      <div class="cart-checkout-page__sidebar-container">
        @php do_action('woocommerce_checkout_before_order_review_heading') @endphp

        <h3 id="order_review_heading"><?php esc_html_e( 'Your order', 'woocommerce' ); ?></h3>

        @php do_action('woocommerce_checkout_before_order_review') @endphp

        <div id="order_review" class="woocommerce-checkout-review-order">
          @php do_action('woocommerce_checkout_order_review') @endphp
        </div>
      </div>
    </div>

    <div class="cart-checkout-page__footer">
      @php do_action('woocommerce_checkout_after_order_review') @endphp
    </div>
  </form>

  @php do_action('woocommerce_after_checkout_form', $checkout) @endphp
@endsection

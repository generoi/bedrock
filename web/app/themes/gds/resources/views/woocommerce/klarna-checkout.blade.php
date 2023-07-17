{{--
/**
 * Klarna Checkout page
 *
 * Overrides /checkout/form-checkout.php.
 *
 * @package klarna-checkout-for-woocommerce
 */
--}}

@extends('layouts.app')

@section('content')
  {{-- If checkout registration is disabled and not logged in, the user cannot checkout. --}}
  @if (! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in())
    {!! esc_html(apply_filters('woocommerce_checkout_must_be_logged_in_message', __('You must be logged in to checkout.', 'woocommerce'))) !!}
    @php return @endphp
  @endif

  @php $settings = get_option('woocommerce_kco_settings') @endphp

  <form name="checkout" class="checkout woocommerce-checkout kco-checkout alignwide">
    @php do_action('kco_wc_before_wrapper') @endphp

    <div class="cart-checkout-page cart-checkout-page--checkout alignwide" id="kco-wrapper">
      <div class="cart-checkout-page__progress-bar">
        @include('woocommerce.partials.progress-bar')
      </div>

      <div class="cart-checkout-page__title">
        @if (!str_contains(get_the_content(), '</h1>'))
          @include('partials.page-header')
        @endif
      </div>

      <div class="cart-checkout-page__content is-container">
        @php do_action('woocommerce_before_checkout_form', WC()->checkout()) @endphp
        @php woocommerce_checkout_coupon_form() @endphp

        <div id="kco-iframe">
          @php do_action('kco_wc_before_snippet') @endphp
          @php kco_wc_show_snippet() @endphp
          @php do_action('kco_wc_after_snippet') @endphp
        </div>
      </div>

      <div class="cart-checkout-page__sidebar">
        <div class="cart-checkout-page__sidebar-container">
          <div id="kco-order-review" class="woocommerce-checkout-review-order">
            @php do_action('kco_wc_before_order_review') @endphp
            @if (! isset($settings['show_subtotal_detail']) || in_array($settings['show_subtotal_detail'], ['woo', 'both'], true))
              @php woocommerce_order_review() @endphp
            @endif

            @php do_action('kco_wc_after_order_review') @endphp
          </div>

        </div>
      </div>
    </div>
    @php do_action('kco_wc_after_wrapper') @endphp
  </form>
  @php do_action('woocommerce_after_checkout_form', WC()->checkout()) @endphp
@endsection

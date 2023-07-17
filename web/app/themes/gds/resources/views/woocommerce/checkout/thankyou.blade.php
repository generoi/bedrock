{{--
/**
 * Thankyou page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/thankyou.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.7.0
 */
--}}

@extends('layouts.app')

@section('content')
  <div class="woocommerce-order cart-checkout-page alignwide">
    <div class="cart-checkout-page__progress-bar">
      @include('woocommerce.partials.progress-bar')
    </div>

    <div class="cart-checkout-page__title">
      @if (!str_contains(get_the_content(), '</h1>'))
        @include('partials.page-header')
      @endif
    </div>

    <div class="cart-checkout-page__content is-container">
      @if ($order)
        @php do_action('woocommerce_before_thankyou', $order->get_id()) @endphp

        @if ($order->has_status('failed'))

          <p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed">
            {!! esc_html('Unfortunately your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woocommerce') !!}
          </p>

          <p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed-actions">
            <a href="{{ $order->get_checkout_payment_url() }}" class="button pay">{{ __('Pay', 'woocommerce') }}</a>
            @if (is_user_logged_in())
              <a href="{{ wc_get_page_permalink('myaccount') }}" class="button pay">{{ __('My account', 'woocommerce') }}</a>
            @endif
          </p>

        @else
          <p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">
            {!! apply_filters('woocommerce_thankyou_order_received_text', esc_html__('Thank you. Your order has been received.', 'woocommerce'), $order) !!}
          </p>

          <ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details">
            <li class="woocommerce-order-overview__order order">
              {!! esc_html('Order number:', 'woocommerce') !!}
              <strong>{!! $order->get_order_number() !!}</strong>
            </li>

            <li class="woocommerce-order-overview__date date">
              {!! esc_html('Date:', 'woocommerce') !!}
              <strong>{!! wc_format_datetime($order->get_date_created()) !!}</strong>
            </li>

            @if (is_user_logged_in() && $order->get_user_id() === get_current_user_id() && $order->get_billing_email())
              <li class="woocommerce-order-overview__email email">
                {!! esc_html('Email:', 'woocommerce') !!}
                <strong>{!! $order->get_billing_email() !!}</strong>
              </li>
            @endif

            <li class="woocommerce-order-overview__total total">
              {!! esc_html('Total:', 'woocommerce') !!}
              <strong>{!! $order->get_formatted_order_total() !!}</strong>
            </li>

            @if ($order->get_payment_method_title())
              <li class="woocommerce-order-overview__payment-method method">
                {!! esc_html('Payment method:', 'woocommerce') !!}
                <strong>{!! wp_kses_post($order->get_payment_method_title()) !!}</strong>
              </li>
            @endif
          </ul>

        @endif

        @php do_action('woocommerce_thankyou_' . $order->get_payment_method(), $order->get_id()) @endphp
        @php do_action('woocommerce_thankyou', $order->get_id()) @endphp


        @php $show_customer_details = is_user_logged_in() && $order->get_user_id() === get_current_user_id() @endphp
        @if ($show_customer_details)
          {!! wc_get_template('order/order-details-customer.php', ['order' => $order]) !!}
        @endif
      @else
        <p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received">
          {!! apply_filters('woocommerce_thankyou_order_received_text', esc_html__('Thank you. Your order has been received.', 'woocommerce'), null) !!}
        </p>
      @endif
    </div>
    <div class="cart-checkout-page__sidebar">
      <div class="cart-checkout-page__sidebar-container">
        @if ($order)
          {!! woocommerce_order_details_table($order->get_id()) !!}
        @endif
      </div>
    </div>
  </div>
@endsection

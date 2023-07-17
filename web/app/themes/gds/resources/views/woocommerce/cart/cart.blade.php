{{--
/**
 * Cart Page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.8.0
 */
--}}

@extends('layouts.app')

@section('content')
  <div class="cart-checkout-page cart-checkout-page--cart alignwide woocommerce">
    <div class="cart-checkout-page__progress-bar">
      @include('woocommerce.partials.progress-bar')
    </div>

    <div class="cart-checkout-page__title">
      @if (!str_contains(get_the_content(), '</h1>'))
        @include('partials.page-header')
      @endif
    </div>

    <div class="cart-checkout-page__content">
      @php do_action('woocommerce_before_cart') @endphp

      <form class="woocommerce-cart-form" action="{{ wc_get_cart_url() }}" method="post">
        @php do_action('woocommerce_before_cart_table') @endphp

        @php do_action('woocommerce_before_cart_contents') @endphp

        <div class="woocommerce-cart-form__table">
          @foreach ($cart as $key => $item)
            @include('woocommerce.partials.cart-item', [
              'item' => $item,
              'key' => $key,
            ])
          @endforeach
        </div>

        @php do_action('woocommerce_cart_contents') @endphp

        <div class="woocommerce-cart-form__coupon">
          @include('woocommerce.partials.coupon-form')
        </div>

        <div class="woocommerce-cart-form__actions">
          <button type="submit" class="button" name="update_cart" value="{{ __('Update cart', 'woocommerce') }}">
            {{ __('Update cart', 'woocommerce') }}
          </button>

          @php do_action('woocommerce_cart_actions') @endphp
          @php wp_nonce_field('woocommerce-cart', 'woocommerce-cart-nonce') @endphp
        </div>

        @php do_action('woocommerce_after_cart_contents') @endphp
        @php do_action('woocommerce_after_cart_table') @endphp
      </form>
    </div>

    <div class="cart-checkout-page__sidebar">
      <div class="cart-checkout-page__sidebar-container">
        @php do_action('woocommerce_before_cart_collaterals') @endphp
        <div class="cart-collaterals">
          @php do_action('woocommerce_cart_collaterals') @endphp

          {{-- Duplicate used by JS --}}
          <button
            type="button"
            class="button is-hidden"
            name="update_cart"
            value="{{ __('Update cart', 'woocommerce') }}"
            data-cart-update-button
          >
            {{ __('Update cart', 'woocommerce') }}
          </button>
        </div>
        @php do_action('woocommerce_after_cart') @endphp
      </div>
    </div>

    <div class="cart-checkout-page__footer">
      @php woocommerce_cross_sell_display() @endphp
    </div>
  </div>
@endsection

@if (wc_coupons_enabled())
  <div class="coupon">
    <label for="coupon_code" class="screen-reader-text">{{ __('Coupon:', 'woocommerce') }}</label>
    <input type="text" name="coupon_code" class="input-text" id="coupon_code" value="" placeholder="{{ __('Coupon code', 'woocommerce') }}" />
    <button type="submit"
      class="button"
      name="apply_coupon"
      value="{{ __('Apply coupon', 'woocommerce')}}"
    >
      {{ __('Apply coupon', 'woocommerce') }}
    </button>
    @php do_action('woocommerce_cart_coupon') @endphp
  </div>
@endif

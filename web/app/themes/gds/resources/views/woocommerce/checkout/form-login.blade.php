{{--
/**
 * Checkout login form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-login.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.8.0
--}}

@if (is_user_logged_in() || get_option('woocommerce_enable_checkout_login_reminder') === 'no')
	@php return @endphp
@endif

<div class="woocommerce-form-login-toggle">
	{!! wc_print_notice(
    sprintf(
      '%s <toggle-button class="link" aria-controls="checkout-login-modal" aria-haspopup="true">%s</a>',
      apply_filters('woocommerce_checkout_login_message', esc_html__('Returning customer?', 'woocommerce')),
      esc_html__('Click here to login', 'woocommerce'),
    ), 'notice'
  ) !!}
</div>

<modal-dialog id="checkout-login-modal">
  <i slot="close-icon" class="fa-solid fa-xmark" title="{{ __('Close', 'gds') }}"></i>
  @php woocommerce_login_form([
    'message'  => esc_html__('If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.', 'woocommerce'),
    'redirect' => wc_get_checkout_url(),
  ]) @endphp
</modal-dialog>

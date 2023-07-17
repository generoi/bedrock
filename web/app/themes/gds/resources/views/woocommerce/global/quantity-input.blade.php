{{--
/**
 * Product quantity inputs
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/global/quantity-input.php.
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
 *
 * @var bool   $readonly If the input should be set to readonly mode.
 * @var string $type     The input type attribute.
 */
--}}

<div class="quantity is-type-{{ $type }}">
  @php do_action('woocommerce_before_quantity_input_field') @endphp
  <label class="screen-reader-text" for="{{ $input_id }}">
    @if (!empty($args['product_name']))
      {{ sprintf(__('%s quantity', 'woocommerce'), wp_strip_all_tags($args['product_name'])) }}
    @else
      {{ __('Quantity', 'woocommerce') }}
    @endif
  </label>
  <input
    type="{{ $type }}"
    @if ($readonly) readonly="readonly" @endif
    id="{{ $input_id }}"
    class="{{ join(' ', (array) $classes) }}"
    name="{{ $input_name }}"
    value="{{ $input_value }}"
    aria-label="{{ __('Product quantity', 'woocommerce') }}"
    size="4"
    min="{{ $min_value }}"
    max="{{ 0 < $max_value ? $max_value : '' }}"
    @if (! $readonly)
      step="{{ $step }}"
      placeholder="{{ $placeholder }}"
      inputmode="{{ $inputmode }}"
      autocomplete="{{ isset($autocomplete) ? $autocomplete : 'on' }}"
    @endif
  />
  @php do_action('woocommerce_after_quantity_input_field') @endphp
</div>

{{--
/**
 * Show error messages
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/notices/error.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.9.0
 */
--}}

@if (! $notices)
  @php return @endphp
@endif

<toast-notice class="woocommerce-error" role="alert">
  <i slot="close-icon" class="fa-solid fa-xmark" title="{{ __('Close', 'gds') }}"></i>
  <ul>
    @foreach ($notices as $notice)
      <li {!! wc_get_notice_data_attr($notice) !!}>
        {!! wc_kses_notice($notice['notice']) !!}
      </li>
    @endforeach
  </ul>
</toast-notice>

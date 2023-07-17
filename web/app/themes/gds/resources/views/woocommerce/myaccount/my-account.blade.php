{{--
/**
 * My Account page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/my-account.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.0
 */
--}}

@extends('layouts.app')

@section('content')
  <div class="account-page alignwide">
    <div class="account-page__content is-container woocommerce-MyAccount-content">
		  @php do_action('woocommerce_account_content') @endphp
    </div>

    <div class="account-page__title">
      @if (!str_contains(get_the_content(), '</h1>'))
        @include('partials.page-header')
      @endif
    </div>

    <div class="account-page__sidebar">
      <div class="account-page__sidebar-container">
        @php do_action('woocommerce_account_navigation') @endphp
      </div>
    </div>
  </div>
@endsection

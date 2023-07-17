<nav class="progress-bar" aria-label="{{ __('Checkout progress', 'gds') }}">
  <ol
    class="progress-bar__list"
    style="--progress: {{ (is_order_received_page() ? 1 : (is_checkout() ? 0.5 : 0)) }}"
  >
    <li class="progress-bar__step {{ is_cart() ? 'is-active' : '' }}">
      <a
        href="{{ wc_get_cart_url() }}"
        @if (is_cart()) aria-current="page" @endif
      >
        {!! __('Cart', 'gds') !!}
      </a>
    </li>

    <li class="progress-bar__step {{ (is_checkout() && ! is_order_received_page()) ? 'is-active' : '' }}">
      <a
        href="{{ wc_get_checkout_url() }}"
        @if (is_cart()) aria-current="page" @endif
      >
        {!! __('Shipping & payment ', 'gds') !!}
      </a>
    </li>

    <li class="progress-bar__step {{ is_order_received_page() ? 'is-active' : '' }}">
      <span>
        {!! __('Summary', 'gds') !!}
      </span>
    </li>
  </ol>
</nav>

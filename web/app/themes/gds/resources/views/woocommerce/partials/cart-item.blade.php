<div class="cart-item {{ apply_filters('woocommerce_cart_item_class', 'cart_item', $item, $key) }}">
  <div class="cart-item__thumbnail">
    @if ($permalink)
      <a href="{{ $permalink}}">
        {!! $thumbnail !!}
      </a>
    @else
      {!! $thumbnail !!}
    @endif
  </div>

  <div class="cart-item__name">
    @if ($permalink)
      <a href="{{ $permalink }}">
        {!! $product_name !!}
      </a>
    @else
      {!! $product_name !!}
    @endif

    @php do_action('woocommerce_after_cart_item_name', $item, $key) @endphp

    {!! wc_get_formatted_cart_item_data($item) !!}

    @if ($backorder_notification)
      {!! $backorder_notification !!}
    @endif
  </div>

  <div class="cart-item__price">
    @if ($subtotal)
      {!! $subtotal !!}
    @else
      {!! $price !!}
    @endif
  </div>

  <div class="cart-item__quantity">
    @php
      $quantity = woocommerce_quantity_input(
        array(
          'input_name'   => "cart[{$key}][qty]",
          'input_value'  => $quantity,
          'max_value'    => $max_quantity,
          'min_value'    => $min_quantity,
          'product_name' => $product_name,
        ),
        $product,
        false
      );
    @endphp

    {!! apply_filters('woocommerce_cart_item_quantity', $quantity, $key, $item) !!}

    {!! apply_filters(
        'woocommerce_cart_item_remove_link',
        sprintf(
          '<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s">%s</a>',
          esc_url(wc_get_cart_remove_url($key)),
          esc_attr(sprintf(__('Remove %s from cart', 'woocommerce'), $product_name)),
          esc_attr($product_id),
          esc_attr($product->get_sku()),
          '<i class="fa-regular fa-trash"></i>',
        ),
        $key
    ) !!}
  </div>
</div>

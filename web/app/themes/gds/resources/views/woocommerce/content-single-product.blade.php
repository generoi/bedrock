@block('gds/breadcrumb')

@php do_action('woocommerce_before_single_product') @endphp

@php global $product; @endphp

<article id="product-{{ get_the_ID() }}" {!! wc_product_class('alignwide product-page', $product) !!}>
  <div class="product-page__gallery">

    @php $gallery_id = wp_unique_id('carousel-slide-'); @endphp
    <gds-carousel>
      @foreach ($gallery as $idx => $item)
        <a href="#" class="product-page__gallery__slide" id="{{ $gallery_id }}-{{ $idx }}">
          {!! wp_get_attachment_image($item->ID, 'large', false, [
            'sizes' => '(max-width: 670px) 100vw, (max-width: 1200px) 50vw, 537px',
            'loading' => $loop->first ? 'eager' : 'lazy',
          ]) !!}
        </a>
      @endforeach

      <i slot="icon-prev" class="fa fa-solid fa-chevron-left"></i>
      <i slot="icon-next" class="fa fa-solid fa-chevron-right"></i>
    </gds-carousel>

    @if (count($gallery) > 1)
      <gds-carousel-pager
        class="product-page__gallery__pager"
      >
        @foreach ($gallery as $idx => $item)
          <button
            aria-label="{{ sprintf(__('Slide %s', 'gds'), $idx + 1) }}"
            aria-selected="{{ $loop->first ? 'true' : 'false' }}"
            aria-controls="{{ $gallery_id }}-{{ $idx }}"
          >
            {!! wp_get_attachment_image($item->ID, 'thumbnail', false, [
              'loading' => 'lazy'
            ]) !!}
          </button>
        @endforeach
      </gds-carousel-pager>
    @endif

    @php do_action('woocommerce_before_single_product_summary') @endphp
  </div>

  <div class="product-page__summary">
    @if (!str_contains(get_the_content(), '</h1>'))
      @include('partials.page-header')
    @endif

    @php woocommerce_template_single_excerpt() @endphp
    @php woocommerce_template_single_price() @endphp

    <ul class="product-page__meta">
      @if ($sku)
        <li>{{ __('SKU', 'woocommerce') }}: {{ $sku }}</li>
      @endif
      @if ($weight)
        <li>{{ __('Weight', 'woocommerce') }}: {!! $weight !!}</li>
      @endif
      @if ($dimensions)
        <li>{{ __('Dimensions', 'woocommerce') }}: {!! $dimensions !!}</li>
      @endif
      @if ($category_list)
        <li>{{ __('Categories', 'woocommerce') }}: {!! $category_list !!}</li>
      @endif
    </ul>

    @php do_action('woocommerce_single_product_summary') @endphp

    @php woocommerce_template_single_add_to_cart() @endphp
  </div>

  <div class="product-page__content">
    @php do_action('woocommerce_after_single_product_summary') @endphp
    @php do_action('woocommerce_after_single_product') @endphp

    @php the_content() @endphp

    @foreach ($tabs as $key => $tab)
      <div class="wp-block-gds-accordion-item">
        <gds-accordion-item>
          <span slot="label">
            {!! esc_html($tab['title']) !!}
          </span>
          <i slot="icon" class="fa fa-solid fa-chevron-down"></i>

          <div>
            {!! call_user_func($tab['callback'], $key, $tab); !!}
          </div>
        </gds-accordion-item>
      </div>
    @endforeach

    @if ($upsell_products)
      <h2>{!! __('You may also like&hellip;', 'woocommerce') !!}</h2>
      @block('gds/product-carousel', [
        'use_pagination' => true,
        'query' => $upsell_products,
        'align' => 'wide',
      ])
    @endif

    @if ($related_products)
      <h2>{{ __( 'Related products', 'woocommerce') }}</h2>
      @block('gds/product-carousel', [
        'use_pagination' => true,
        'query' => $related_products,
        'align' => 'wide',
      ])
    @endif

  </div>
</article>


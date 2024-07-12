<div {!! get_block_wrapper_attributes() !!}>
  <gds-carousel
    class="wp-block-gds-carousel__carousel"
    column-count="{{ $columnCount ?? 1 }}"
    aria-label="{{ $ariaLabel ?? __('Carousel', 'gds') }}"
  >
    {!! $content !!}

    <span slot="icon-prev">
      @svg('icons.solid.chevron-left')
      <span class="sr-only">{{ __('Previous slide', 'gds') }}</span>
    </span>
    <span slot="icon-next">
      @svg('icons.solid.chevron-right')
      <span class="sr-only">{{ __('Next slide', 'gds') }}</span>
    </span>
  </gds-carousel>
</div>

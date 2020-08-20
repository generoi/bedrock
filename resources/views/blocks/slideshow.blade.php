<div class="
  {{ $block->classes }}
  swiper-container
  {{ $hasArrowsOutside ? 'has-arrows-outside' : '' }}
  {{ $hasPagination ? 'has-pagination' : '' }}
" data-swiper='@json($swiper)'>
  <div class="swiper-pagination"></div>

  <div class="swiper-wrapper">
    {!! $content !!}
  </div>

  @if ($hasNavigation)
    <div class="swiper-button-prev"><i class="fa fa-chevron-left fa-3x" aria-hidden></i></div>
    <div class="swiper-button-next"><i class="fa fa-chevron-right fa-3x" aria-hidden></i></div>
  @endif
</div>

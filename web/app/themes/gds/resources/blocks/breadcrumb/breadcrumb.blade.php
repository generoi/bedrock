<nav {!! get_block_wrapper_attributes(['aria-label' => __('Breadcrumb', 'gds')]) !!}>
  @if (! $is_preview)
    {!! $content !!}
  @else
    Breadcrumb placeholder...
  @endif
</nav>

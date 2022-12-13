<div {!! get_block_wrapper_attributes() !!}>
  @if (!$is_preview)
    {!! $content !!}
  @else
    Breadcrumb placeholder...
  @endif
</div>

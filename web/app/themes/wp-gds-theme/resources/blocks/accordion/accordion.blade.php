<div {!! get_block_wrapper_attributes() !!}>
  <gds-accordion @if ($attributes->allowMultiple ?? false) allow-multiple @endif>
    {!! $content !!}
  </gds-accordion>
</div>

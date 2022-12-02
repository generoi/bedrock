<div {!! get_block_wrapper_attributes() !!}>
  <gds-accordion @if ($allowMultiple ?? false) allow-multiple @endif>
    {!! $content !!}
  </gds-accordion>
</div>

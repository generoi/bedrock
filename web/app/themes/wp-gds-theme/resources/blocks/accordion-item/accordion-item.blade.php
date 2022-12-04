<div {!! get_block_wrapper_attributes() !!}>
  <gds-accordion-item>
    <span slot="label">{!! $attributes->label ?? '' !!}</span>
    <i slot="icon" class="fa fa-solid fa-chevron-down"></i>
    <div>
      {!! $content ?? '' !!}
    </div>
  </gds-accordion-item>
</div>

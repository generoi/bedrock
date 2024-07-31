<div {!! get_block_wrapper_attributes() !!}>
  <gds-accordion-item>
    <span slot="label">{!! $attributes->label ?? '' !!}</span>
    @svg('svgs.solid.chevron-down', '', ['slot' => 'icon'])
    <div>
      {!! $content ?? '' !!}
    </div>
  </gds-accordion-item>
</div>

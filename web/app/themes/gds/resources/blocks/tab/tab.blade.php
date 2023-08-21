<div {!! get_block_wrapper_attributes([
	  'class' => ($attributes->index === 0 ? 'active' : ''),
	  'id' => 'tabpanel-' . sanitize_title( $attributes->label ),
	  'tabindex' => '0',
	  'role' => 'tabpanel',
	  'aria-labelledby' => 'tab-' . sanitize_title( $attributes->label ),
	]) !!}
>
  <div class="wp-block-gds-tab__content">
    {!! $content !!}
  </div>
</div>

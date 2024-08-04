<div {!! get_block_wrapper_attributes([
	  'class' => ($index === 0 ? 'active' : ''),
	  'id' => 'tabpanel-' . $uid . '-' . $index,
	  'role' => 'tabpanel',
	  'aria-labelledby' => 'tab-' . $uid . '-' . $index,
	]) !!}
>
  <div class="wp-block-gds-tab__content">
    {!! $content !!}
  </div>
</div>

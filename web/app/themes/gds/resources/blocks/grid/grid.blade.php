<div {!! get_block_wrapper_attributes([
  'class' => sprintf('has-%d-columns', $attributes->columns)
]) !!}>
  {!! $content !!}
</div>

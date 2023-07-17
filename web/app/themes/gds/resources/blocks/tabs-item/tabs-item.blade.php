@php($tabId = wp_unique_id('tab'))
@php($contentId = wp_unique_id('tab-content'))

<button
  id="{{ $tabId }}"
  type="button"
  role="tab"
  aria-selected="false"
  aria-controls="{{ $contentId }}"
  slot="tab"
>
  {!! $attributes->label ?? '' !!}
</button>

<div {!! get_block_wrapper_attributes([
  'id' => $contentId,
  'aria-labelledby' => $tabId,
  'role' => 'tabpanel',
  'slot' => 'content',
]) !!}>
  {!! $content ?? '' !!}
</div>

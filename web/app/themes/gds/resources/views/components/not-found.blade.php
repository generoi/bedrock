@props([
    'header' => null,
    'search' => null,
    'title' => null,
    'searchLabel' => null,
    'description' => null
])

@php(render_block(['blockName' => 'core/media-text']))

<div
  class="wp-block-media-text alignwide is-stacked-on-mobile has-media-on-the-right is-vertically-aligned-top"
  style="grid-template-columns: 68% 1fr"
>
  <figure class="wp-block-media-text__media">
    <img
      decoding="async"
      src="{{ asset('images/404.webp')->uri() }}"
      alt=""
    />
  </figure>
  <div class="wp-block-media-text__content">
    @if (!empty(trim($header)))
      {!! $header !!}
    @else
      <h1 class="has-xl-heading-font-size">
        {!! $title ?? __('Sorry...', 'gds') !!}
      </h1>
    @endif

    @if (!empty(trim($slot)))
      {!! $slot !!}
    @endif

    <p class="has-l-body-font-size">
      {!! $description ??
          __('We could not find what you were looking for.', 'gds') !!}
    </p>

    @if (!empty(trim($search)))
      {!! $search !!}
    @else
      @block('core/search', [
          'label' => $searchLabel ?? __('Wanna try searching for it?', 'gds'),
          'buttonUseIcon' => true
      ])
    @endif
  </div>
</div>

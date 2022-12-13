@php(render_block(['blockName' => 'core/media-text']))

<div class="wp-block-media-text alignwide is-stacked-on-mobile has-media-on-the-right" style="grid-template-columns: 60% 1fr;">
  <figure class="wp-block-media-text__media">
    <img decoding="async" src="https://cldup.com/Fz-ASbo2s3.jpg" alt="">
  </figure>
  <div class="wp-block-media-text__content">
    @if (!empty(trim($header)))
      {!! $header !!}
    @else
      <a id="main-content" tabindex="-1"></a>
      <h1 class="has-xl-heading-font-size">{!! $title ?? __('Sorry...', 'gds') !!}</h1>
    @endif

    @if (!empty(trim($slot)))
      {!! $slot !!}
    @endif

    <p class="has-l-body-font-size">{!! $description ?? __('We could not find what you were looking for.', 'gds') !!}</p>

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

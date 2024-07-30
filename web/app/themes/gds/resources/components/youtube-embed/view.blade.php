<youtube-embed youtube-id="{!! $youtube_id !!}">
  @if ($placeholder_image ?? null)
    {!! wp_get_attachment_image($placeholder_image, 'full', false) !!}
  @else
    <img
      src="https://img.youtube.com/vi/{{ $youtube_id }}/maxresdefault.jpg"
      loading="lazy"
      alt=""
      width="3200"
      height="1800"
      srcset="
        https://img.youtube.com/vi/{{ $youtube_id }}/default.jpg        120w,
        https://img.youtube.com/vi/{{ $youtube_id }}/mqdefault.jpg      320w,
        https://img.youtube.com/vi/{{ $youtube_id }}/hqdefault.jpg      480w,
        https://img.youtube.com/vi/{{ $youtube_id }}/sddefault.jpg      640w,
        https://img.youtube.com/vi/{{ $youtube_id }}/maxresdefault.jpg 1280w
      "
    />
  @endif

  <a
    slot="button"
    href="https://www.youtube.com/watch?v={{ $youtube_id }}"
    target="_blank"
  >
    <span class="sr-only">{{ __('Play', 'gds') }}</span>
    @svg('icons.brands.youtube')
  </a>
</youtube-embed>

<article {!! get_block_wrapper_attributes([
    'class' => collect([
        !empty($attributes->textAlign)
            ? sprintf('has-text-align-%s', $attributes->textAlign)
            : '',
        'wp-block-gds-post-teaser--' . get_post_type(),
    ])->filter()->join(' '),
]) !!}>
  @blocks
    <!-- wp:gds/media-card @json([
        'useFeaturedImage' => has_post_thumbnail(),
        'mediaUrl' => Roots\asset('images/default-teaser.webp')->uri(),
        'mediaAlt' => '',
    ]) -->
    <!-- wp:core/post-title {"level": {{ $heading_level ?? 3 }}} /-->

    <span class="sr-only">{{ __('Published on', 'gds') }}:</span>
    <!-- wp:core/post-date {"format": "d.m.Y"} /-->

    <!-- wp:core/post-excerpt /-->

    @if (has_term('', 'category'))
      <span class="sr-only">{{ __('Categories', 'gds') }}:</span>
      <!-- wp:core/post-terms {"term": "category", "separator": ""} /-->
    @endif

    <!-- wp:core/read-more {"content": "{{ __('Read article', 'gds') }}"} /-->
    <!-- /wp:gds/media-card -->
  @endblocks
</article>

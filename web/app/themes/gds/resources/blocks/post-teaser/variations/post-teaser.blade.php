<div {!! get_block_wrapper_attributes([
  'class' => collect([
    ! empty($attributes->textAlign) ? sprintf('has-text-align-%s', $attributes->textAlign) : '',
    'wp-block-gds-post-teaser--' . get_post_type(),
  ])->filter()->join(' ')
]) !!}>
  @blocks
    <!-- wp:gds/media-card @json([
      'useFeaturedImage' => has_post_thumbnail(),
      'mediaUrl' => Roots\asset('images/default-teaser.webp')->uri()
    ]) -->
      <!-- wp:core/post-title {"level": 3} /-->
      <!-- wp:core/post-date {"format": "d.m.Y"} /-->
      <!-- wp:core/post-excerpt /-->
      <!-- wp:core/post-terms {"term": "category", "separator": ""} /-->
      <!-- wp:core/read-more {"content": "{{ __('Read article', 'gds') }}"} /-->
    <!-- /wp:gds/media-card -->
  @endblocks
</div>

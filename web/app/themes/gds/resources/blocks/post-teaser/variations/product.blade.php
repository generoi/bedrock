<article {!! get_block_wrapper_attributes([
    'class' => collect([
        !empty($attributes->textAlign)
            ? sprintf('has-text-align-%s', $attributes->textAlign)
            : '',
        'wp-block-gds-post-teaser--' . get_post_type()
    ])->filter()->join(' ')
]) !!}>
  @blocks
    <!-- wp:gds/media-card @json([
        'useFeaturedImage' => has_post_thumbnail(),
        'mediaUrl' => Roots\asset('images/default-teaser.webp')->uri(),
        'mediaAlt' => ''
    ]) -->
    <!-- wp:core/post-title {"level": {{ $heading_level ?? 3 }}} /-->
    <!-- wp:woocommerce/product-price /-->
    <!-- wp:core/read-more {"content": "{{ __('Read more', 'gds') }}"} /-->
    <!-- /wp:gds/media-card -->
  @endblocks
</article>

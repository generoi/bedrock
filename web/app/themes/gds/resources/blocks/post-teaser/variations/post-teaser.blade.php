<div {!! get_block_wrapper_attributes([
  'class' => collect([
    ! empty($attributes->textAlign) ? sprintf('has-text-align-%s', $attributes->textAlign) : '',
    'wp-block-gds-post-teaser--' . get_post_type(),
  ])->filter()->join(' ')
]) !!}>
  <figure class="wp-block-gds-post-teaser__media">
    @if (has_post_thumbnail())
      @block('core/post-featured-image', ['sizeSlug' => 'medium'])
    @else
      <img src="{{ Roots\asset('images/default-teaser.webp') }}" alt="" />
    @endif
  </figure>
  <div class="wp-block-gds-post-teaser__content">
    @block('core/post-title', ['level' => 3])
    @block('core/post-date', ['format' => 'd.m.Y'])
    @block('core/post-excerpt', [])

    @block('core/post-terms', [
      'term' => 'category',
      'separator' => '',
    ])

    @block('core/read-more', [
      'content' => __('Read article', 'gds') . get_svg('icons.solid.chevron-right', '2xs')
    ])
  </div>
</div>

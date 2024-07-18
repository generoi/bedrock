<div {!! get_block_wrapper_attributes([
  'class' => ! empty($attributes->textAlign) ? sprintf('has-text-align-%s', $attributes->textAlign) : ''
]) !!}>
  <figure class="wp-block-gds-media-card__media">
    @if ($attributes->useFeaturedImage ?? false)
      {!! wp_get_attachment_image(get_post_thumbnail_id(), 'large') !!}
    @elseif ($attributes->mediaId ?? false)
      {!! wp_get_attachment_image($attributes->mediaId, 'large') !!}
    @elseif ($attributes->mediaUrl ?? false)
      <img src="{!! $attributes->mediaUrl !!}" alt="" />
    @endif
  </figure>
  <div class="wp-block-gds-media-card__content">
    {!! $content !!}
  </div>
</div>

<div {!! get_block_wrapper_attributes() !!}>
  <figure class="wp-block-gds-media-card__media">
    @if ($attributes->mediaId ?? false)
      {!! wp_get_attachment_image($attributes->mediaId, 'large') !!}
    @elseif ($attributes->mediaUrl ?? false)
      <img src="{!! $attributes->mediaUrl !!}" alt="" />
    @endif
  </figure>
  <div class="wp-block-gds-media-card__content">
    {!! $content !!}
  </div>
</div>

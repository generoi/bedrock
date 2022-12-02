<div {!! get_block_wrapper_attributes() !!}>
  <figure class="wp-block-gds-media-card__media">
    @if ($mediaId ?? false)
      {!! wp_get_attachment_image($mediaId, 'large') !!}
    @else
      <img src="{!! $mediaUrl !!}" />
    @endif
  </figure>
  <div class="wp-block-gds-media-card__content">
    {!! $content !!}
  </div>
</div>

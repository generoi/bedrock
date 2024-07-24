<div {!! get_block_wrapper_attributes([
  'class' => ! empty($attributes->textAlign) ? sprintf('has-text-align-%s', $attributes->textAlign) : ''
]) !!}>
  @php $imageAttributes = isset($attributes->mediaAlt) ? ['alt' => $attributes->mediaAlt] : []; @endphp
  <figure class="wp-block-gds-media-card__media">
    @if ($attributes->useFeaturedImage ?? false)
      {!! wp_get_attachment_image(get_post_thumbnail_id(), 'large', false, $imageAttributes) !!}
    @elseif ($attributes->mediaId ?? false)
      {!! wp_get_attachment_image($attributes->mediaId, 'large', false, $imageAttributes) !!}
    @elseif ($attributes->mediaUrl ?? false)
      <img src="{!! $attributes->mediaUrl !!}" alt="{{ $attributes->mediaAlt ?? '' }}" />
    @endif
  </figure>
  <div class="wp-block-gds-media-card__content">
    {!! $content !!}
  </div>
</div>

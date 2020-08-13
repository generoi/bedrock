
@if ($mediaType === 'image')
  @php(list($imageUrl, $imageWidth, $imageHeight) = wp_get_attachment_image_src($mediaId, 'large'))
@else
  <!-- <video src="{{ wp_get_attachment_url($mediaId) }}" autoplay muted loop style="{{ $mediaStyle }}"> -->
@endif

<div class="{{ $block->classes }}">
  <gds-media-card
    image-url="{{$imageUrl}}"
  >
    <div slot="content" class="{{ $block->className }}__content">
      {!! $content !!}
    </div>
  </gds-media-card>
</div>

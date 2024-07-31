<figure {!! get_block_wrapper_attributes() !!}>
  <gds-carousel
    class="wp-block-gds-gallery-carousel__slideshow"
    column-count="1"
    aria-label="{{ $ariaLabel ?? __('Gallery', 'gds') }}"
  >
    @foreach ($media as $idx => $item)
      <div
        class="wp-block-gds-gallery-carousel__slide"
        id="{{ $gallery_id }}-{{ $idx }}"
        aria-label="{{ sprintf(__('%d of %d', 'gds'), $loop->iteration, $loop->count) }}"
      >
        @if ($item->id ?? null)
          @if (wp_attachment_is('video', $item->id))
            @php
              $meta = wp_get_attachment_metadata($item->id);
            @endphp

            <video
              src="{{ wp_get_attachment_url($item->id) }}"
              loading="{{ $loop->first ? 'eager' : 'lazy' }}"
              controls
              preload="metadata"
              @if (!empty($meta['width'])) width={{ $meta['width'] }} @endif
              @if (!empty($meta['height'])) height={{ $meta['height'] }} @endif
              @if (!empty($meta['width']) && !empty($meta['height'])) style="--aspect-ratio: {{ $meta['width'] }} / {{ $meta['height'] }}" @endif
            ></video>
          @else
            {!! wp_get_attachment_image($item->id, 'large', false, [
                'sizes' => '(max-width: 670px) 100vw, (max-width: 1200px) 50vw, 537px',
                'loading' => $loop->first ? 'eager' : 'lazy'
            ]) !!}
          @endif
        @elseif ($item->embed ?? null)
          {!! $item->embed !!}
        @endif
      </div>
    @endforeach

    <span slot="icon-prev">
      @svg('svgs.solid.chevron-left')
      <span class="sr-only">{{ __('Previous slide', 'gds') }}</span>
    </span>
    <span slot="icon-next">
      @svg('svgs.solid.chevron-right')
      <span class="sr-only">{{ __('Next slide', 'gds') }}</span>
    </span>
  </gds-carousel>

  @if (count($media) > 1)
    <gds-carousel-pager class="wp-block-gds-gallery-carousel__thumbs">
      @foreach ($media as $idx => $item)
        <button
          aria-label="{{ sprintf(__('Go to slide %s', 'gds'), $idx + 1) }}"
          aria-current="{{ $loop->first ? 'true' : 'false' }}"
          aria-controls="{{ $gallery_id }}-{{ $idx }}"
        >
          @if (!empty($item->id))
            @if (wp_attachment_is('video', $item->id))
              <video
                src="{{ wp_get_attachment_url($item->id) }}"
                loading="lazy"
                preload="metadata"
              ></video>
            @else
              {!! wp_get_attachment_image($item->id, 'thumbnail', false, [
                  'sizes' => '100px'
              ]) !!}
            @endif
          @elseif (!empty($item->thumbnail))
            <img
              src="{{ $item->thumbnail }}"
              width="150"
              height="150"
              sizes="100px"
              loading="lazy"
            />
          @endif
        </button>
      @endforeach
    </gds-carousel-pager>
  @endif
</figure>

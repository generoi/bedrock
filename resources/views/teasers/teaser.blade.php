<div class="teaser teaser--{{ get_post_type() }}">
  <gds-media-card
    href="{{ get_permalink() }}"
    image-url="{{$image}}"
    @if ($superimposed_image ?? false)
      superimposed-url="{{$superimposed_image}}"
    @endif
    @if ($superimposed_offset ?? false)
      superimposed-top="{{$superimposed_offset->top}}"
      superimposed-right="{{$superimposed_offset->right}}"
      superimposed-bottom="{{$superimposed_offset->bottom}}"
      superimposed-left="{{$superimposed_offset->left}}"
    @endif
  >
    <div slot="content">
      <gds-heading size="s">
        {!! esc_html($title) !!}
      </gds-heading>

      <gds-paragraph size="l">
        {!! $excerpt !!}
      </gds-paragraph>

      @foreach ($categories as $category)
        <gds-tag href="{{ get_category_link($category) }}">{!! esc_html($category->name) !!}</gds-tag>
      @endforeach

    </div>
  </gds-media-card>
</div>

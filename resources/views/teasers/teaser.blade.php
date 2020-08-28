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
    <gds-heading size="s" slot="headline">
      {!! esc_html($title) !!}
    </gds-heading>

    @if ($excerpt)
      <gds-paragraph size="l" slot="description">
        {!! $excerpt !!}
      </gds-paragraph>
    @endif

    @if ($categories)
      <gds-tag-group slot="tags">
        @foreach ($categories as $category)
          <gds-tag href="{{ get_category_link($category) }}">{!! esc_html($category->name) !!}</gds-tag>
        @endforeach
      </gds-tag-group>
    @endif
  </gds-media-card>
</div>

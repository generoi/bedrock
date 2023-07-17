<div class="teaser teaser--{{ get_post_type() }} {{ $className ?? '' }}">
  <figure class="teaser__media">
    @if (has_post_thumbnail())
      {!! wp_get_attachment_image(get_post_thumbnail_id(), 'medium', false, []) !!}
    @else
      <img src="{{ Roots\asset('images/default-teaser.webp') }}" alt="" />
    @endif
  </figure>
  <div class="teaser__content">
    <h3 class="teaser__title">
      {!! esc_html(get_the_title()) !!}
    </h3>

    @block('core/post-date', [
      'format' => 'd.m.Y',
      'className' => 'teaser__date'
    ])

    @if ($excerpt = get_the_excerpt())
      <p class="teaser__description">{!! $excerpt !!}</p>
    @endif

    @if ($categories = get_the_terms(get_post(), 'category'))
      <div class="teaser__tags">
        @foreach ($categories as $term)
          <a class="teaser__tag" href="{{ get_term_link($term) }}">
            {!! esc_html($term->name) !!}
          </a>
        @endforeach
      </div>
    @endif

    <p>
      <a class="teaser__readmore teaser__link" href="{{ get_permalink() }}">
        <span>{{ __('Read article', 'gds') }}</span>
        <i class="fa-solid fa-chevrons-right fa-2xs"></i>
      </a>
    </p>
  </div>
</div>

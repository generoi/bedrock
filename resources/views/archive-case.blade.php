@extends('layouts.app')

@section('content')
  @if ($featured)
    <div class="wp-block-media-text alignfull has-media-on-the-right is-stacked-on-mobile is-image-fill has-ui-03-background-color has-background">
      <figure class="wp-block-media-text__media">
        @if ($featured->thumbnail)
          {!! $featured->thumbnail !!}
        @else
          <img src="{{ Roots\asset('images/default-teaser.jpg') }}" />
        @endif
      </figure>

      <div class="wp-block-media-text__content">
        @if ($featured->label)
          <gds-label size="m">{!! esc_html($featured->label) !!}</gds-label>
        @endif

        <h2 class="has-xxl-heading-font-size">
          <a href="{{ $featured->permalink }}">
            {!! $featured->title !!}
          </a>
        </h2>

        @if ($featured->categories)
          <div class="wp-block-buttons">
            @foreach ($featured->categories as $category)
              <gds-tag href="{{ get_category_link($category) }}">{!! esc_html($category->name) !!}</gds-tag>
            @endforeach
          </div>
        @endif

        <a href="{{ $featured->permalink }}">
          <gds-button left-icon="➞" text>
            {{ __('Check out project', 'gds') }}
          </gds-button>
        </a>
      </div>
    </div>
  @endif

  @if ($page = get_post())
    @includeFirst(['partials.content-page', 'partials.content'])
  @endif

  @include('blocks.case-list', [
    'block' => (object) [
      'classes' => 'wp-block-case-list',
    ],
    'use_pagination' => true,
    'query' => $query,
  ])
@endsection

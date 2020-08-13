@extends('layouts.app')

@section('content')
  @php($featured_image = get_field('featured_image', sprintf('%s_%s', get_queried_object()->taxonomy, get_queried_object()->term_id)))

  @if ($featured_image)
    <div class="wp-block-cover has-white-color is-style-hero alignfull" style="background-position: 100% 100%; background-image: url({{ wp_get_attachment_url($featured_image, 'large') }})">
      <div class="wp-block-cover__inner-container">
        {!! render_block([
          'blockName' => 'kokoomus/breadcrumb',
        ]) !!}

        <h1 class="is-style-label has-xxl-font-size has-text-align-right">
          {!! apply_filters('gds/heading_label', get_the_archive_title()) !!}
        </h1>
      </div>
    </div>
  @else
    <div class="has-text-align-center has-gray-color">
      {!! render_block([
        'blockName' => 'kokoomus/breadcrumb',
      ]) !!}
    </div>

    <h1 class="has-text-align-center">{!! get_the_archive_title() !!}</h1>
  @endif

  {!! apply_filters('the_content', category_description()) !!}

  @if (! have_posts())
    <x-alert type="warning">
      {!! __('Sorry, no results were found.', 'sage') !!}
    </x-alert>
  @endif

  @include('blocks.article-list', [
    'block' => (object) [
      'classes' => 'wp-block-article-list alignwide',
    ],
    'use_pagination' => true,
    'query' => $GLOBALS['wp_query'],
  ])
@endsection

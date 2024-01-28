@extends('layouts.app')

@section('content')
  @if (have_posts())
    @include('partials.page-header')

    {!! $content !!}

    @block('gds/article-grid', [
      'use_pagination' => true,
      'query' => $GLOBALS['wp_query'],
      'align' => '',
      'layout' => [
        'type' => 'flex',
        'justifyContent' => 'left'
      ]
    ])
  @else
    @php(block_template_part('not-found'))
  @endif
@endsection

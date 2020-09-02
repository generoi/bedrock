@extends('layouts.app')

@section('content')
  @if ($page)
    @includeFirst(['partials.content-page', 'partials.content'])
  @else
    @include('partials.page-header')
  @endif

  @if (!$has_archive_block)
    @include('blocks.article-list', [
      'block' => (object) [
        'classes' => 'wp-block-article-list',
      ],
      'use_pagination' => true,
      'query' => $query,
    ])
  @endif
@endsection

@extends('layouts.app')

@section('content')
  @include('partials.page-header')

  @if (! have_posts())
    <x-alert type="warning">
      {!! __('Sorry, no results were found.', 'sage') !!}
    </x-alert>
  @endif

  @include('blocks.article-list', [
    'block' => (object) [
      'classes' => 'wp-block-article-list',
    ],
    'use_pagination' => true,
    'query' => $GLOBALS['wp_query'],
  ])
@endsection

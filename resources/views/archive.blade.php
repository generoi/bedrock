@extends('layouts.app')

@section('content')
  @include('blocks.article-list', [
    'block' => (object) [
      'classes' => 'wp-block-article-list',
    ],
    'use_pagination' => true,
    'query' => $query,
  ])
@endsection

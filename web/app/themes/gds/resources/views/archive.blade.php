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
    <x-not-found>
      <x-slot name="header">
        @include('partials.page-header')
      </x-slot>

      {!! $content !!}
    </x-not-found>
  @endif
@endsection

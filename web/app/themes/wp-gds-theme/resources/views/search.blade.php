@extends('layouts.app')

@section('content')
  @if (have_posts())
    @include('partials.page-header')

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
    <x-not-found
      :description="__('Sorry, no results were found.', 'gds')"
      :search-label="__('Wanna try again?', 'gds')"
    >
      <x-slot name="header">
        @include('partials.page-header')
      </x-slot>
    </x-not-found>
  @endif

@endsection

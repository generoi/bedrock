@extends('layouts.app')

@section('content')
  @if (have_posts())
    @include('partials.page-header')

    @blocks
      <!-- wp:query {"query":{"inherit":true}} -->
      <div class="wp-block-query">
        <!-- wp:post-template {"layout":{"type":"grid","columnCount":2}} -->
        <!-- wp:gds/post-teaser /-->
        <!-- /wp:post-template -->

        <!-- wp:query-pagination -->
        <!-- wp:query-pagination-previous /-->
        <!-- wp:query-pagination-numbers /-->
        <!-- wp:query-pagination-next /-->
        <!-- /wp:query-pagination -->
      </div>
      <!-- /wp:query -->
    @endblocks
  @else
    @php(block_template_part('not-found'))
  @endif
@endsection

@if (!$has_page_title)
  @include('partials.page-header')
@endif

@php(the_content())

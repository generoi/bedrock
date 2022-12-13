@if (!str_contains(get_the_content(), '</h1>'))
  @include('partials.page-header')
@endif

@php(the_content())

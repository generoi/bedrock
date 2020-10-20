@if (strpos(get_the_content(), '</h1>') === false)
  <h1 class="has-text-align-center">@php(the_title())</h1>
@endif

@php(the_content())

{!! wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']) !!}

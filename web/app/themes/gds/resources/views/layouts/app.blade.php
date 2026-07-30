<a
  class="sr-only-focusable"
  href="#main-content"
>
  {{ __('Skip to content', 'gds') }}
</a>

@php(block_template_part('header'))

<div class="container">
  @section('root_container')
    <main
      @php(post_class('is-root-container'))
      id="main-content"
      tabindex="-1"
    >
      @yield('content')
    </main>
  @show
</div>

@php(block_template_part('footer'))

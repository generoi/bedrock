<a
  class="sr-only-focusable"
  href="#main-content"
>
  {{ __('Skip to content', 'gds') }}
</a>

@include('partials.header')

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

@include('partials.footer')

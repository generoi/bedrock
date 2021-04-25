
<a class="sr-only-focusable" href="#main-content">
  {{ __('Skip to content', 'gds-a11y') }}
</a>

@include('partials.header')

<div class="container">
  <main class="is-root-container">
    <a id="main-content" tabindex="-1"></a>

    @yield('content')
  </main>

  @hasSection('sidebar')
    <aside class="sidebar">
      @yield('sidebar')
    </aside>
  @endif
</div>

@include('partials.footer')

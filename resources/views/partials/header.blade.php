{{ d($primary_navigation) }}
<gds-navigation>
  <a slot="logo" href="{{ home_url('/') }}">
    <img src="{{ Roots\asset('images/logo.svg')->uri() }}" alt="{{ __('logo', 'gds') }}" title="{{ __('Go to frontpage', 'gds') }}" />
  </a>
  <div slot="menu">
    @if ($primary_navigation)
      <gds-menu>
        @foreach ($primary_navigation as $item)
          @include('partials.menu-item', ['item' => $item])
        @endforeach
      </gds-menu>
    @endif
  </div>
  <div slot="desktop-extensions">
    <gds-menu>
      @foreach ($languages as $language)
        <a slot="item" href="{{ $language->url }}" title="{{ $language->title }}">
          <gds-menu-item {{ $language->active ? 'active' : '' }}>{{ $language->label }}</gds-menu-item>
        </a>
      @endforeach
    </gds-menu>
  </div>
  <div slot="mobile-extensions">
    <gds-menu>
      @foreach ($languages as $language)
        <a slot="item" href="{{ $language->url }}" title="{{ $language->title }}">
          <gds-menu-item {{ $language->active ? 'active' : '' }}>{{ $language->label }}</gds-menu-item>
        </a>
      @endforeach
    </gds-menu>
  </div>
</gds-navigation>

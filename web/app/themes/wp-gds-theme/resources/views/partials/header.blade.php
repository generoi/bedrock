<gds-navigation
  accessible-navigation-label="{{ __('Primary menu', 'gds-a11y') }}"
  accessible-hamburger-label="{{ __('Menu', 'gds-a11y') }}"
>
  <a slot="logo" href="{{ home_url('/') }}" rel="home" aria-label="{{ sprintf(__('%s frontpage', 'gds-a11y'), $siteName) }}">
    <img
      src="{{ Roots\asset('images/logo.svg')->uri() }}"
      alt=""
      title="{{ __('Go to frontpage', 'gds-a11y') }}"
      width="159"
      height="48"
      loading="eager"
      aria-hidden="true"
    />
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
  <div slot="search">
    <gds-search-form
      action="{{ home_url('/') }}" query="s"
      accessible-input-label="{{ __('Search this site', 'gds-a11y') }}"
      accessible-submit-label="{{ __('Search', 'gds-a11y') }}"
      placeholder="{{ __('Search', 'gds-a11y') }}"
      collapse-on="(max-width: 600px)"
    ></gds-search-form>
  </div>
  <div slot="desktop-extensions">
    <nav aria-label="{{ __('Language menu', 'gds-a11y') }}">
      <gds-menu>
        @foreach ($languages as $language)
          <a slot="item" href="{{ $language->url }}" title="{{ $language->title }}" aria-label="{{ $language->title }}">
            <gds-menu-item {{ $language->active ? 'active' : '' }}>{{ $language->label }}</gds-menu-item>
          </a>
        @endforeach
      </gds-menu>
    </nav>
  </div>
  <div slot="mobile-extensions">
    <nav aria-label="{{ __('Language menu', 'gds-a11y') }}">
      <gds-menu>
        @foreach ($languages as $language)
          <a slot="item" href="{{ $language->url }}" title="{{ $language->title }}" aria-label="{{ $language->title }}">
            <gds-menu-item {{ $language->active ? 'active' : '' }}>{{ $language->label }}</gds-menu-item>
          </a>
        @endforeach
      </gds-menu>
    </nav>
  </div>
</gds-navigation>

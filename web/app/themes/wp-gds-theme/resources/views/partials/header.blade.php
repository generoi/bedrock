<header class="header" id="header">
  <div class="header__inner-container">
    <a
      class="header__logo"
      href="{{ home_url('/') }}"
      rel="home"
      aria-label="{{ sprintf(__('%s frontpage', 'gds-a11y'), $siteName) }}"
    >
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

    <toggle-button
      class="header__menu-toggler"
      aria-controls="header"
    >
      <span
        class="header__menu-toggler-icon"
        aria-hidden="true"
      ></span>
      <span class="sr-only">{{ __('Menu', 'gds-a11y') }}</span>
    </toggle-button>

    <nav
      aria-label="{{ __('Primary menu', 'gds-a11y') }}"
      class="header__navigation"
    >
      @if ($primary_navigation)
        <div class="menu">
          @foreach ($primary_navigation as $item)
            @include('partials.menu-item', ['item' => $item])
          @endforeach
        </div>
      @endif
    </nav>

    @if ($current_language)
    <div
      aria-label="{{ __('Language', 'gds-a11y') }}"
      class="header__languages language-menu"
    >
      <toggle-button
        class="language-menu__toggle"
        aria-controls="language-menu"
      >
        <span aria-hidden="true">
          {!! strtoupper(esc_html($current_language->slug)) !!}
        </span>
        <span class="sr-only">{{__('Languages')}} </span>
        <span class="language-menu__toggle__icon">
          <i class="fa fa-solid fa-chevron-down"></i>
        </span>
      </toggle-button>

      <div
        class="language-menu__menu"
        id="language-menu"
      >
        @foreach ($languages as $item)
          <a
            class="language-menu__link {{ ($item->current_lang ) ? 'is-active': '' }}"
            href="{{ $item->url }}"
          >
            {!! esc_html($item->name) !!}
          </a>
        @endforeach
      </div>
    </div>
    @endif

    <form
      action="{{ home_url('/') }}"
      method="get"
      role="search"
      class="header__search"
    >
      <label for="s" class="sr-only">
        {{ __('Search this site', 'gds-a11y') }}
      </label>
      <input slot="input" type="search" name="s" placeholder="{{ __('Search', 'gds-a11y') }}" autocomplete="off" />

      <button type="submit" aria-label="{{ __('Search', 'gds-a11y') }}">
        <i class="fa fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  </div>
</header>

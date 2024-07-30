<header
  class="header"
  id="header"
>
  <div class="header__inner-container">
    <a
      class="header__logo"
      href="{{ $home_url }}"
      rel="home"
      aria-label="{{ sprintf(__('%s frontpage', 'gds'), $siteName) }}"
    >
      <img
        src="{{ Roots\asset('images/logo.svg')->uri() }}"
        alt=""
        title="{{ __('Go to frontpage', 'gds') }}"
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
      <span class="sr-only">{{ __('Menu', 'gds') }}</span>
    </toggle-button>

    <nav
      aria-label="{{ __('Primary menu', 'gds') }}"
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

    @if (count($languages) > 1)
      <nav
        aria-label="{{ __('Language', 'gds') }}"
        class="header__languages language-menu"
      >
        <toggle-button
          class="language-menu__toggle"
          aria-controls="language-menu"
        >
          <span aria-hidden="true">
            {!! strtoupper(esc_html($current_language->slug)) !!}
          </span>
          <span class="sr-only">{{ __('Languages') }}</span>
          <span class="language-menu__toggle__icon">
            @svg('icons.solid.chevron-down')
          </span>
        </toggle-button>

        <div
          class="language-menu__menu"
          id="language-menu"
        >
          @foreach ($languages as $item)
            <a
              class="language-menu__link {{ $item->current_lang ? 'is-active' : '' }}"
              @if ($item->current_lang) aria-current="page" @endif
              href="{{ $item->url }}"
              lang="{{ $item->locale }}"
            >
              {!! esc_html($item->name) !!}
            </a>
          @endforeach
        </div>
      </nav>
    @endif

    @if ($is_webshop)
      <div class="header__actions">
        @block('woocommerce/mini-cart')
        @block('woocommerce/customer-account', ['displayStyle' => 'icon_only'])
      </div>
    @endif

    <form
      action="{{ $home_url }}"
      method="get"
      role="search"
      class="header__search"
    >
      <label
        for="s"
        class="sr-only"
      >
        {{ __('Search this site', 'gds') }}
      </label>
      <input
        slot="input"
        type="search"
        name="s"
        id="s"
        placeholder="{{ __('Search', 'gds') }}"
        autocomplete="off"
      />

      <button type="submit">
        @svg('icons.solid.magnifying-glass', '', ['title' => __('Search', 'gds')])
      </button>
    </form>
  </div>
</header>

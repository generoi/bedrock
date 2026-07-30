<div {!! get_block_wrapper_attributes() !!}>
  <form
    action="{{ function_exists('pll_home_url') ? pll_home_url() : home_url('/') }}"
    method="get"
    role="search"
    class="wp-block-gds-site-search__form"
  >
    <label
      for="header-site-search"
      class="sr-only"
    >
      {{ __('Search this site', 'gds') }}
    </label>
    <input
      type="search"
      name="s"
      id="header-site-search"
      placeholder="{{ __('Search', 'gds') }}"
      autocomplete="off"
    />

    <button type="submit">
      <span class="sr-only">
        {{ __('Submit search', 'gds') }}
      </span>
      @svg('svgs.solid.magnifying-glass')
    </button>
  </form>
</div>

<form role="search" method="get" class="search-form" action="{{ home_url('/') }}">
  <label>
    <span class="screen-reader-text">{{ _x('Search for:', 'label', 'gds') }}</span>
    <input type="search" class="search-field" placeholder="{!! esc_attr_x('Search &hellip;', 'placeholder', 'gds') !!}" value="{{ get_search_query() }}" name="s">
  </label>

  <input type="submit" class="button" value="{{ esc_attr_x('Search', 'submit button', 'gds') }}">
</form>

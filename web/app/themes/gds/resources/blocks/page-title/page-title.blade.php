@block('core/heading')

<h1 {!! get_block_wrapper_attributes([]) !!}>
  @if (is_home())
    @if ($home = get_option('page_for_posts', true))
      {!! esc_html(get_the_title($home)) !!}
    @else
      {{ __('Latest Posts', 'gds') }}
    @endif
  @elseif (is_archive())
    {!! get_the_archive_title() !!}
  @elseif (is_search() && get_search_query())
    {!! sprintf(
        __(
            /* translators: %s replaced with the search term */
            'Search Results for <span class="has-secondary-color">“%s”</span>',
            'gds'
        ),
        get_search_query()
    ) !!}
  @elseif (is_search())
    {{ /* translators: page title on search page */ __('Search results', 'gds') }}
  @elseif (is_404())
    {{ /* translators: page title on error page */ __('Sorry...', 'gds') }}
  @else
    {!! esc_html(get_the_title()) !!}
  @endif
</h1>
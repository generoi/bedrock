<h1 {!! get_block_wrapper_attributes([
    'className' => 'has-xl-heading-font-size'
]) !!}>
  @if (is_home())
    @if ($home = get_option('page_for_posts', true))
      {!! esc_html(get_the_title($home)) !!}
    @else
      {{ __('Latest Posts', 'gds') }}
    @endif
  @elseif (is_archive())
    {!! esc_html(get_the_archive_title()) !!}
  @elseif (is_search())
    {!! sprintf(
        __('Search Results for <span class="has-primary-color">%s</span>', 'gds'),
        get_search_query()
    ) !!}
  @elseif (is_404())
    {{ __('Not Found', 'gds') }}
  @else
    {!! esc_html(get_the_title()) !!}
  @endif
</h1>

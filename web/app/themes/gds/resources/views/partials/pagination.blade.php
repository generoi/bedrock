@if (isset($query) && $query->max_num_pages > 1)
  <nav
    class="pagination"
    aria-label="{{ __('Pagination') }}"
  >
    {!! paginate_links([
        'base' => str_replace(999999, '%#%', esc_url(get_pagenum_link(999999))),
        'format' => '?paged=%#%',
        'current' => max(1, get_query_var('paged')),
        'total' => $query->max_num_pages,
        'type' => 'list',
        'before_page_number' => sprintf(
            '<span class="sr-only">%s</span>',
            __('Page', 'gds')
        ),
        'prev_text' => get_svg('solid.chevron-left', 'is-xs', [
            'title' => __('Previous page', 'gds')
        ]),
        'next_text' => get_svg('solid.chevron-right', 'is-xs', [
            'title' => __('Next page', 'gds')
        ]),
        'add_fragment' => !empty($fragment) ? "#$fragment" : null
    ]) !!}
  </nav>
@endif

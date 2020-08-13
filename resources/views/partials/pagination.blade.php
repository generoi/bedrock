@if (isset($query) && $query->max_num_pages > 1)
  <div class="pagination">
    {!! paginate_links([
      'base' => str_replace(999999, '%#%', esc_url(get_pagenum_link(999999))),
      'format' => '?paged=%#%',
      'current' => max(1, get_query_var('paged')),
      'total' => $query->max_num_pages,
      'type' => 'list',
      'prev_text' => '<i class="fas fa-chevron-left fa-xs"></i>',
      'next_text' => '<i class="fas fa-chevron-right fa-xs"></i>',
      'add_fragment' => !empty($fragment) ? "#$fragment" : null,
    ]) !!}
  </div>
@endif

<div {!! get_block_wrapper_attributes([]) !!}>
  <gds-carousel>
    @while ($query->have_posts()) @php($query->the_post())
      @includeFirst(['teasers.' . get_post_type(), 'teasers.teaser'], [
        'post' => get_post(),
        'className' => 'is-card',
      ])
    @endwhile
    @php(wp_reset_postdata())

    @if ($query->post_count > 1)
      <i slot="icon-prev" class="fa fa-solid fa-chevron-left"></i>
      <i slot="icon-next" class="fa fa-solid fa-chevron-right"></i>
    @endif
  </gds-carousel>
</div>

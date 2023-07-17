<div {!! get_block_wrapper_attributes(['class' => 'grid']) !!}>
  @while ($query->have_posts()) @php($query->the_post())
    <div class="cell {{ $align === '' ? 'small:6' : 'small:6 large:4' }}">
      @includeFirst(['teasers.' . get_post_type(), 'teasers.teaser'], [
        'post' => get_post(),
        'className' => 'is-card'
      ])
    </div>
  @endwhile
  @php(wp_reset_postdata())

  @if ($use_pagination ?? false)
    @include('partials.pagination', ['query' => $query])
  @endif
</div>

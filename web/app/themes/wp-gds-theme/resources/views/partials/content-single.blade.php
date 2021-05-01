<article @php(post_class('alignfull'))>
  <div class="entry-content">
    @if (strpos(get_the_content(), '</h1>') === false)
      @if (has_post_thumbnail())
        @enqueue_block_style('core/media-text')
        <div class="wp-block-media-text alignfull has-media-on-the-right is-stacked-on-mobile is-image-fill has-ui-03-background-color has-background">
          <figure class="wp-block-media-text__media">
            @php(the_post_thumbnail('post-thumbnail', []))
          </figure>
          <div class="wp-block-media-text__content">
            @include('partials.entry-meta')
          </div>
        </div>
      @else
        @enqueue_block_style('core/group')
        <div class="wp-block-group has-background has-light-blue-background-color has-text-align-center alignfull">
          <div class="wp-block-group__inner-container">
            @include('partials.entry-meta')
          </div>
        </div>
      @endif
    @endif

    @php(the_content())

    <x-related-content
      :type="$related->type"
      :label="$related->label"
      :query="$related->query"
    />
  </div>
</article>

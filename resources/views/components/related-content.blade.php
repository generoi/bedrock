@if ($query->have_posts())
  <div class="wp-block-group alignfull has-background has-ui-background-01-background-color">
    <div class="wp-block-group__inner-container">
      <h2 class="has-text-align-center has-light-heading-font-size">{!! esc_html($label) !!}</h2>

      @include("blocks.$type-list", [
        'block' => (object) [
          'classes' => "wp-block-$type-list alignwide",
        ],
        'use_pagination' => false,
        'query' => $query,
      ])
    </div>
  </div>
@endif

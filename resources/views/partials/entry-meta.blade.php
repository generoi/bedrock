@if ($label)
  <gds-label size="m">{!! esc_html($label) !!}</gds-label>
@endif

<h1>@php(the_title())</h1>

@if ($categories)
  <div class="wp-block-buttons">
    @foreach ($categories as $category)
      <gds-tag href="{{ get_category_link($category) }}">{!! esc_html($category->name) !!}</gds-tag>
    @endforeach
  </div>
@endif

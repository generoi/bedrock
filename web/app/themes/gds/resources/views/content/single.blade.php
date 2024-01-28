@block('gds/breadcrumb')

@if (! $has_page_title)
  <div class="hentry__header">
    @block('core/post-date', ['format' => 'd.m.Y'])
    @block('gds/share')
  </div>

  @include('partials.page-header')
@endif

@php(the_content())

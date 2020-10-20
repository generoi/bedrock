@if ($primary_navigation)
  <ul class="vertical medium-horizontal menu" data-responsive-menu="drilldown medium-dropdown">
    @foreach ($primary_navigation as $item)
      @include('partials.menu-item', ['item' => $item])
    @endforeach
  </ul>
@endif

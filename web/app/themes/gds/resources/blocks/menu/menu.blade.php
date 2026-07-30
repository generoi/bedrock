<nav {!! get_block_wrapper_attributes([
    'aria-label' => $menu->name ?: __('Primary navigation', 'gds'),
]) !!}>
  @foreach ($navigation as $item)
    @include('blocks::menu.partials.menu-item', [
        'item' => $item,
        'depth' => 0,
    ])
  @endforeach
</nav>

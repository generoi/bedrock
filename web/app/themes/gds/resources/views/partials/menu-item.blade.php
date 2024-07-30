<div
  class="menu-item {{ $item->children ? 'has-child' : '' }}"
  id="menu-item-{{ $item->id }}"
>
  <a
    class="menu-item__link {{ $item->active || $item->activeAncestor ? 'is-active' : '' }}"
    href="{{ $item->url }}"
    target="{{ $item->target ?? '' }}"
    title="{{ $item->title ?? '' }}"
    @if ($item->active) aria-current="page" @endif
  >
    {!! esc_html($item->label) !!}
  </a>

  @if ($item->children)
    <toggle-button
      class="menu-item__toggle"
      aria-haspopup="true"
      aria-controls="submenu-{{ $item->id }} menu-item-{{ $item->id }}"
      aria-label="{{ $item->label }}"
    >
      @svg('icons.solid.chevron-down')
    </toggle-button>

    <div
      class="menu-item__submenu"
      id="submenu-{{ $item->id }}"
      role="region"
      aria-label="{{ $item->label }}"
    >
      @foreach ($item->children as $child)
        @include('partials.menu-item', ['item' => $child])
      @endforeach
    </div>
  @endif
</div>

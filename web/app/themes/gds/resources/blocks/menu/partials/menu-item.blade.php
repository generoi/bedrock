<div
  class="wp-block-gds-menu-item {{ $item->children ? 'has-child' : '' }}"
  id="menu-item-{{ $item->id }}"
>
  @if ($item->children)
    <toggle-button
      class="wp-block-gds-menu-item__toggle"
      aria-haspopup="true"
      aria-controls="submenu-{{ $item->id }}"
      aria-label="{{ sprintf(__('%s submenu', 'gds'), $item->label) }}"
    >
      <span class="wp-block-gds-menu-item__toggle-label">
        {!! esc_html($item->label) !!}
      </span>

      <span class="wp-block-gds-menu-item__toggle-icon" aria-hidden="true"></span>
    </toggle-button>

    <div
      class="wp-block-gds-menu-item__submenu"
      id="submenu-{{ $item->id }}"
      role="region"
      aria-label="{{ $item->label }}"
    >
      @foreach ($item->children as $child)
        @include('blocks::menu.partials.menu-item', [
            'item' => $child,
            'depth' => $depth + 1,
        ])
      @endforeach
    </div>
  @else
    <a
      class="
        {{ $depth === 0 ? 'wp-block-gds-menu-item__link' : 'wp-block-gds-menu-item__submenu-link' }}
        {{ $item->active || $item->activeAncestor ? 'is-active' : '' }}
      "
      href="{{ $item->url }}"
      target="{{ $item->target ?? '' }}"
      title="{{ $item->title ?? '' }}"
      @if ($item->active) aria-current="page" @endif
    >
      {!! esc_html($item->label) !!}
    </a>
  @endif
</div>

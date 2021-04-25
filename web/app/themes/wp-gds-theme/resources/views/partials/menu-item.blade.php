@if ($item->children)
  <gds-menu-item-nested slot="item" submenu-icon="❯">
    <a
      slot="link"
      href="{{ $item->url }}"
      target="{{ $item->target ?? '' }}"
      title="{{ $item->title ?? '' }}"
      class="{{ ($item->active || $item->activeAncestor) ? 'active': '' }}"
      @if ($item->active) aria-current="page" @endif
    >
      <gds-menu-item>{!! esc_html($item->label) !!}</gds-menu-item>
    </a>
    <gds-submenu slot="submenu">
      @foreach ($item->children as $child)
        @include('partials.menu-item', ['item' => $child, 'slot' => 'submenu-item'])
      @endforeach
    </gds-submenu>
  </gds-menu-item-nested>
@else
  <a
    slot="{{ $slot ?? 'item' }}"
    href="{{ $item->url }}"
    target="{{ $item->target ?? '' }}"
    title="{{ $item->title ?? '' }}"
    class="{{ ($item->active || $item->activeAncestor) ? 'active': '' }}"
    @if ($item->active) aria-current="page" @endif
  >
    <gds-menu-item>{!! esc_html($item->label) !!}</gds-menu-item>
  </a>
@endif

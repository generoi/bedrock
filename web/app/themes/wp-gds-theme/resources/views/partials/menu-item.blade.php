<a
  slot="item"
  href="{{ $item->url }}"
  target="{{ $item->target ?? '' }}"
  title="{{ $item->title ?? '' }}"
  class="{{ ($item->active || $item->activeAncestor) ? 'active': '' }}"
>
  <gds-menu-item>{!! esc_html($item->label) !!}</gds-menu-item>
</a>

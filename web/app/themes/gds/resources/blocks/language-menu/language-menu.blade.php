<nav {!! get_block_wrapper_attributes([
    'aria-label' => __('Language', 'gds')
]) !!}>
  <ul class="language-menu__list">
    @foreach ($languages as $item)
      <li>
        <a
          class="language-menu__link {{ $item->current_lang ? 'is-active' : '' }}"
          href="{{ $item->url }}"
          lang="{{ $item->locale }}"
          aria-label="{{ $item->name }}"
          @if ($item->current_lang) aria-current="page" @endif
        >
          {!! esc_html(strtoupper($item->slug)) !!}
        </a>
      </li>
    @endforeach
  </ul>
</nav>

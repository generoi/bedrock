
<div {!! get_block_wrapper_attributes() !!}>
  <share-button title="{{ $title }}" url="{{ $url }}">
    <toggle-button
      class="wp-block-gds-share__button"
      aria-controls="{{ $share_id }}"
      slot="button"
    >
      <span class="wp-block-gds-share__button-label">
        {{__('Share', 'gds')}}
      </span>
      <i class="fa-regular fa-share-nodes fa-lg"></i>
    </toggle-button>

    <ul
      class="wp-block-gds-share__list"
      id="{{ $share_id }}"
    >
      <li>
        <clipboard-copy
          text="{{ $url }}"
          announce-success="{{ __('Copied!', 'gds') }}"
          announce-failed="{{ __('Failed to copy!', 'gds') }}"
        >
          <i class="fa-regular fa-link fa-xs"></i>
          <span>{{ __('Copy link', 'gds') }}</span>

          <i data-success-icon class="fa-solid fa-check"></i>
          <i data-failed-icon class="fa-solid fa-xmark"></i>
        </clipboard-copy>
      </li>
      <li>
        <a href="mailto:?subject={{ urlencode($title) }}&body={{urlencode($url) }}" rel="nofollow" target="_blank">
          <i class="fa-regular fa-envelope fa-xs"></i>
          <span>{{ __('Send email', 'gds') }}</span>
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode($url) }}" rel="nofollow" target="_blank">
          <i class="fab fa-facebook fa-xs"></i>
          <span>{{ __('Share on Facebook', 'gds') }}</span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/intent/tweet?text={{ urlencode(sprintf('%s %s', $title, $url))}}" rel="nofollow" target="_blank">
          <i class="fa-brands fa-twitter fa-xs"></i>
          <span>{{ __('Share on Twitter') }}</span>
        </a>
      </li>
    </ul>
  </share-button>
</div>


<div {!! get_block_wrapper_attributes() !!}>
  <share-button share-title="{{ $title }}" url="{{ $url }}">
    <toggle-button
      class="wp-block-gds-share__button"
      aria-controls="{{ $share_id }}"
      slot="button"
    >
      <span class="wp-block-gds-share__button-label">
        {{__('Share', 'gds')}}
      </span>
      @svg('icons.regular.share-nodes', 'is-lg')
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
          @svg('icons.regular.link', 'is-xs')
          <span>{{ __('Copy link', 'gds') }}</span>

          @svg('icons.solid.check', '', ['data-success-icon'])
          @svg('icons.solid.xmark', '', ['data-failed-icon'])
        </clipboard-copy>
      </li>
      <li>
        <a href="mailto:?subject={{ urlencode($title) }}&body={{urlencode($url) }}" rel="nofollow" target="_blank">
          @svg('icons.regular.envelope', 'is-xs')
          <span>{{ __('Send email', 'gds') }}</span>
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode($url) }}" rel="nofollow" target="_blank">
          @svg('icons.brands.facebook', 'is-xs')
          <span>{{ __('Share on Facebook', 'gds') }}</span>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/intent/tweet?text={{ urlencode(sprintf('%s %s', $title, $url))}}" rel="nofollow" target="_blank">
          @svg('icons.brands.twitter', 'is-xs')
          <span>{{ __('Share on Twitter') }}</span>
        </a>
      </li>
    </ul>
  </share-button>
</div>

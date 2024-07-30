<div class="wp-block-buttons">
  <a
    class="wp-block-button wp-block-button__link"
    href="https://www.addtoany.com/add_to/print?linkurl={{ urlencode(get_permalink()) }}&amp;linkname={{ urlencode(get_the_title()) }}"
    target="_blank"
  >
    {{ __('Print', 'gds') }}
  </a>
  <a
    class="wp-block-button wp-block-button__link"
    href="https://www.addtoany.com/add_to/facebook?linkurl={{ urlencode(get_permalink()) }}&amp;linkname={{ urlencode(get_the_title()) }}"
    target="_blank"
  >
    {{ __('Share on Facebook', 'gds') }}
  </a>
  <a
    class="wp-block-button wp-block-button__link"
    href="https://www.addtoany.com/add_to/twitter?linkurl={{ urlencode(get_permalink()) }}&amp;linkname={{ urlencode(get_the_title()) }}"
    target="_blank"
  >
    {{ __('Tweet', 'gds') }}
  </a>
</div>

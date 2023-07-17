import {ready} from '~/utils';

ready(() => {
  // Disable all scroll to notices in WooCommerce since our notifications are
  // absolute positioned.
  if (window.jQuery?.scroll_to_notices) {
    window.jQuery.scroll_to_notices = () => {};
  }
})

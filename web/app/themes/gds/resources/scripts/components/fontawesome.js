import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
import {
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

import {
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faMagnifyingGlass,
  faXmark,
  faCheck,
  faChevronsRight,
} from '@fortawesome/pro-solid-svg-icons'

import {
  faShareNodes,
  faEnvelope,
  faLink,
  faTrash,
  faShoppingCart,
} from '@fortawesome/pro-regular-svg-icons'

library.add(
  // Regular
  faEnvelope,
  faShareNodes,
  faLink,
  faTrash,
  faShoppingCart,
  // Solid
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faMagnifyingGlass,
  faXmark,
  faCheck,
  faChevronsRight,
  // Brands
  faFacebook,
  faTwitter,
  faYoutube,
);

config.showMissingIcons = false;

const JQUERY_EVENTS = [
  'wc_fragment_refresh',
  'updated_wc_div',
  'updated_cart_totals',
  'updated_checkout',
];

function i2svg() {
  const originalAnimate = window.jQuery?.fn?.animate;
  if (!originalAnimate) {
    dom.i2svg();
    return;
  }

  window.jQuery.fn.animate = (data) => {
    if (data.scrollTop)
    console.log(e, arguments, this);
    console.trace();
  };
  dom.i2svg();
  //window.jQuery.fn.animate = originalAnimate;
}

export default function () {
  dom.watch();
  return;

  dom.i2svg();

  window.jQuery?.(document.body).on?.(JQUERY_EVENTS.join(' '), (e) => {
    console.log('triggered fontawesome', e);

    i2svg();
    //dom.i2svg({
    //  node: document.querySelector('.woocommerce-checkout-review-order-table')
    //});
  });

  // @todo dom.watch();
}

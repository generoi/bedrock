/**
 * Sticky header when scrolling up.
 *
 * @see http://wicky.nillia.ms/headroom.js/
 * @see asset/styles/components/_headroom.scss
 * @see asset/styles/components/util/_motion-ui.scss
 */
import Headroom from 'headroom.js/dist/headroom';
import 'headroom.js/dist/jQuery.headroom';

// Expose it so jQuery.headroom can use it.
window.Headroom = Headroom;

const ESCAPE_KEYCODE = 27;

class HeadroomComponent {
  constructor(el, options) {
    this.$headroom = $(el);
    this.$toggler = this.$headroom.find('.l-header__nav-toggle');
    this.$content = this.$headroom.next();

    this.$headroom.headroom(Object.assign({
      offset: 205,
      tolerance: 10,
      onPin: () => this.$headroom.trigger('headroom.pinned'),
      onUnpin: () => this.$headroom.trigger('headroom.unpinned'),
    }, options));

    this.$headroom.on('headroom.unpinned', this.closeMenu.bind(this));

    $(document).on('keyup', (e) => {
      if (e.keyCode === ESCAPE_KEYCODE) this.closeMenu();
    })
  }

  closeMenu() {
    if (this.$toggler.length && this.$toggler.is('.active')) {
      this.$toggler.trigger('click');
    }
  }
}

export default function(selector, options = {}) {
  return new HeadroomComponent(selector, options);
}

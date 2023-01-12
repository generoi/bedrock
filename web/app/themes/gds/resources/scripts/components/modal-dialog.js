import './modal-dialog.scss'

const EVENT_SHOW = 'show';
const EVENT_HIDE = 'hide';

// @see https://github.com/KittyGiraudel/focusable-selectors/blob/main/index.js
const FOCUSABLE_SELECTORS = [
  'a[href]:not([tabindex^="-"])',
  'area[href]:not([tabindex^="-"])',
  'input:not([type="hidden"]):not([type="radio"]):not([disabled]):not([tabindex^="-"])',
  'input[type="radio"]:not([disabled]):not([tabindex^="-"])',
  'select:not([disabled]):not([tabindex^="-"])',
  'textarea:not([disabled]):not([tabindex^="-"])',
  'button:not([disabled]):not([tabindex^="-"])',
  'iframe:not([tabindex^="-"])',
  'audio[controls]:not([tabindex^="-"])',
  'video[controls]:not([tabindex^="-"])',
  '[contenteditable]:not([tabindex^="-"])',
  '[tabindex]:not([tabindex^="-"])',
];

/**
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/
 */
export class ModelDialog extends HTMLElement {
  overlayEl;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.addEventListener(EVENT_SHOW, this.show.bind(this));
    this.addEventListener(EVENT_HIDE, this.hide.bind(this));

    this.render();

    this.addEventListener('keydown', this.focusTrap.bind(this));

    if (!this.persistent) {
      this.addEventListener('keydown', this.closeOnEsc.bind(this));
      this.overlayEl.addEventListener('click', this.closeWhenClickOutside.bind(this));
    }
  }

  closeOnEsc(event) {
    if (event.key === 'Escape') {
      this.visible = false;
    }
  }

  focusTrap(event) {
    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = Array.from(
      this.querySelectorAll(FOCUSABLE_SELECTORS.join(','))
    ).filter(
      (child) => child.offsetWidth && child.offsetHeight && child.getClientRects().length
    );

    const firstFocusableElement = focusableElements.at(0);
    const lastFocusableElement = focusableElements.at(-1);

    if (!event.shiftKey) {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
      }
    }
  }

  closeWhenClickOutside() {
    this.visible = false;
  }

  static get observedAttributes() {
    return ['visible', 'persistent', 'scroll-lock'];
  }

  get visible() {
    return this.hasAttribute('visible');
  }

  get persistent() {
    return this.hasAttribute('persistent');
  }

  get scrollLock() {
    return this.hasAttribute('scroll-lock');
  }

  set visible(value) {
    this.dispatchEvent(
      new CustomEvent(
        value ? EVENT_SHOW : EVENT_HIDE,
        {cancelable: true, bubbles: true}
      )
    );
  }

  lockScrolling() {
    document.body.style.overflowY = 'hidden';
  }

  unlockScrolling() {
    document.body.style.overflowY = '';
  }

  show() {
    this.removeAttribute('aria-hidden');
    if (this.scrollLock) {
      this.lockScrolling();
    }
    // Move focus
    this.focus();

    document.body.addEventListener('focus', this.maintainDialogFocus.bind(this), true);
  }

  hide() {
    this.setAttribute('aria-hidden', 'true');

    if (this.scrollLock) {
      this.unlockScrolling();
    }

    document.body.removeEventListener('focus', this.maintainDialogFocus.bind(this), true);
  }

  maintainDialogFocus(event) {
    if (!event.target.closest('[aria-modal="true"]')) {
      this.focus();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :host([aria-hidden="true"]) {
          display: none;
        }

        .overlay {
          position: fixed;
          inset: 0;
        }

        [role="document"] {
          background-color: white;
          padding: 1em;
          z-index: 2;
        }
      </style>
      <div class="overlay" part="overlay"></div>
      <div
        role="document"
        part="dialog"
      >
        <slot></slot>
      </div>
    `;

    this.overlayEl = this.shadowRoot.querySelector('.overlay');

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'dialog');
    }
    if (!this.hasAttribute('aria-modal')) {
      this.setAttribute('aria-modal', 'true');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
    if (!this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }
}

customElements.define('modal-dialog', ModelDialog);

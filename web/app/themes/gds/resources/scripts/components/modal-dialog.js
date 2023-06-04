import './modal-dialog.scss'
import {
  EVENT_CLOSE as EVENT_TOGGLE_BUTTON_CLOSE,
  EVENT_OPEN as EVENT_TOGGLE_BUTTON_OPEN,
} from './toggle-button';

const EVENT_SHOW = 'modal.show';
const EVENT_HIDE = 'modal.hide';

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
  static #idCounter = 0;

  #overlayEl;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    ++this.constructor.#idCounter;

    if (!this.id) {
      this.id = `modal-dialog-${this.constructor.#idCounter}`
    }

    this.addEventListener(EVENT_SHOW, this.show.bind(this));
    this.addEventListener(EVENT_HIDE, this.hide.bind(this));

    // Integrate with toggle-button
    this.addEventListener(EVENT_TOGGLE_BUTTON_OPEN, () => this.visible = true);
    this.addEventListener(EVENT_TOGGLE_BUTTON_CLOSE, () => this.visible = false);

    this.render();

    this.addEventListener('keydown', this.focusTrap.bind(this));

    if (!this.persistent) {
      this.addEventListener('keydown', this.closeOnEsc.bind(this));
      this.#overlayEl.addEventListener('click', this.closeWhenClickOutside.bind(this));
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
    // Mark any element controlling this dialog as expanded
    for (const el of document.querySelectorAll(`[aria-controls="${this.id}"][aria-expanded]`)) {
      el.setAttribute('aria-expanded', 'true');
    }
  }

  hide() {
    this.setAttribute('aria-hidden', 'true');

    if (this.scrollLock) {
      this.unlockScrolling();
    }

    document.body.removeEventListener('focus', this.maintainDialogFocus.bind(this), true);
    // Mark any element controlling this dialog as closed
    for (const el of document.querySelectorAll(`[aria-controls="${this.id}"][aria-expanded]`)) {
      el.setAttribute('aria-expanded', 'false');
    }
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

        .close-button {
          all: unset;
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
          line-height: 1;
          padding: 0.5rem;
        }

        [role="document"] {
          background-color: white;
          padding: 1em;
          z-index: 2;
          position: relative;
        }
      </style>
      <div class="overlay" part="overlay"></div>
      <div
        role="document"
        part="dialog"
      >
        ${this.querySelector('[slot="close-icon"]') && (
          `<button
            class="close-button"
            aria-controls="${this.id}"
            part="close-button"
          >
            <slot name="close-icon"></slot>
          </button>`
        ) || ''}

        <slot></slot>
      </div>
    `;

    this.#overlayEl = this.shadowRoot.querySelector('.overlay');

    this.shadowRoot.querySelector('.close-button')
      .addEventListener?.('click', () => this.visible = false);

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

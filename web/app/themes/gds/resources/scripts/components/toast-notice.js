const DEFAULT_AUTOCLOSE_TIMEOUT = 10;

export class ToastNotice extends HTMLElement {
  static #idCounter = 0;

  #buttonClose;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['auto-close'];
  }

  get autoClose() {
    if (!this.hasAttribute('auto-close')) {
      return false;
    }
    const value = parseInt(this.getAttribute('auto-close')) || DEFAULT_AUTOCLOSE_TIMEOUT;
    return value * 1000;
  }

  connectedCallback() {
    ++this.constructor.#idCounter;

    if (!this.id) {
      this.id = `toast-${this.constructor.#idCounter}`
    }

    this.render();
  }

  close() {
    this.remove();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
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
      </style>

      <button
        class="close-button"
        aria-controls="${this.id}"
        part="close-button"
      >
        <slot name="close-icon"></slot>
      </button>

      <div>
        <slot/>
      </div>
    `;

    this.#buttonClose = this.shadowRoot.querySelector('.close-button');
    this.#buttonClose.addEventListener('click', this.close.bind(this));

    const setupTimeout = () => {
      return setTimeout(this.close.bind(this), this.autoClose);
    }

    if (this.autoClose) {
      let closeTimeoutId = setupTimeout();

      this.addEventListener('mouseover', () => clearTimeout(closeTimeoutId));
      this.addEventListener('mouseout', () => closeTimeoutId = setupTimeout());
    }
    this.dataset.isInitialized = '';
  }
}

customElements.define('toast-notice', ToastNotice);

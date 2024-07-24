/**
 * @example
 * <share-button
 *   share-title="Page title"
 *   url="https://www.example.org"
 * >
 *   Fallback content in case native share is not available.
 * </clipboard-copy>
 */
export class ShareButton extends HTMLElement {
  #buttonEl;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    document.addEventListener('click', this.maybeClickOutside.bind(this));
    this.#buttonEl.addEventListener('click', this.handleClick.bind(this));
  }

  static get observedAttributes() {
    return ['share-title', 'url'];
  }

  get shareTitle() {
    return this.getAttribute('share-title');
  }

  get url() {
    return this.getAttribute('url');
  }

  handleClick(event) {
    if (window.navigator?.share) {
      navigator.share({
        title: this.shareTitle,
        url: this.url,
      });
      event.stopImmediatePropagation();
    }
  }

  maybeClickOutside(event) {
    const target = event.target;
    if (!this.contains(target)) {
      this.#buttonEl?.close?.();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <slot name="button"></slot>
      <slot></slot>
    `;
    this.#buttonEl = this.querySelector('[slot="button"]');
  }
}

const EVENT_COPY_SUCCESS = 'copy-success';
const EVENT_COPY_FAILED = 'copy-failed';

/**
 * @example
 * <clipboard-copy
 *   text="Text to copy"
 *   announce-success="Copied!"
 *   announce-failed="Failed to copy!"
 * >
 *   Copy
 * </clipboard-copy>
 */
export class ClipboardCopy extends HTMLElement {
  #buttonEl;
  #announceEl;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['text', 'announce-success', 'announce-failed', 'status'];
  }

  get text() {
    return this.getAttribute('text');
  }

  get status() {
    return this.getAttribute('status');
  }

  get announceSuccess() {
    return this.getAttribute('announce-success');
  }

  get announceFailed() {
    return this.getAttribute('announce-failed');
  }

  connectedCallback() {
    this.render();
    this.#buttonEl.addEventListener('click', this.handleClick.bind(this));

    this.addEventListener(EVENT_COPY_FAILED, this.handleFailed.bind(this));
    this.addEventListener(EVENT_COPY_SUCCESS, this.handleSuccess.bind(this));
  }

  handleClick() {
    try {
      navigator.clipboard.writeText(this.text).then(
        () => this.dispatchEvent(new CustomEvent(EVENT_COPY_SUCCESS)),
        () => this.dispatchEvent(new CustomEvent(EVENT_COPY_FAILED)),
      );
    } catch (error) {
      console.error(error);
      this.dispatchEvent(new CustomEvent(EVENT_COPY_FAILED));
    }
  }

  handleSuccess() {
    this.#announceEl.textContent = this.announceSuccess;
    this.setAttribute('status', 'success');
  }

  handleFailed() {
    this.#announceEl.innerHTML = this.announceFailed;
    this.setAttribute('status', 'failed');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        .button {
          all: unset;
          cursor: pointer;
        }

        .button:focus-visible {
          outline: var(--gds-outline--focus);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      </style>

      <button class="button" part="button">
        <slot></slot>
      </button>
      <span role="region" aria-live="polite" class="sr-only"></span>
    `;
    this.#buttonEl = this.shadowRoot.querySelector('.button');
    this.#announceEl = this.shadowRoot.querySelector('[aria-live]');
  }
}

customElements.define('share-button', ShareButton);
customElements.define('clipboard-copy', ClipboardCopy);

const EVENT_OPEN = 'open';
const EVENT_CLOSE = 'close';

export class GdsAccordion extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListener(EVENT_OPEN, this.maybeCloseOtherAccordions.bind(this));
  }

  static get observedAttributes() {
    return ['allow-multiple'];
  }

  get allowMultiple() {
    return this.hasAttribute('allow-multiple');
  }

  set allowMultiple(value) {
    if (value) {
      this.setAttribute('allow-multiple', '');
    } else {
      this.removeAttribute('allow-multiple');
    }
  }

  maybeCloseOtherAccordions(event) {
    if (this.allowMultiple) {
      return;
    }
    Array.from(this.querySelectorAll('gds-accordion-item'))
      .filter((item) => item !== event.target)
      .forEach((item) => item.close());
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
      </style>
      <slot></slot>
    `;
  }
}

export class GdsAccordionItem extends HTMLElement {
  static #idCounter = 0;

  #headerEl;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.toggle = this.toggle.bind(this);
  }

  static get observedAttributes() {
    return ['expanded'];
  }

  get expanded() {
    return this.hasAttribute('expanded');
  }

  set expanded(isExpanded) {
    this.dispatchEvent(
      new CustomEvent(
        isExpanded ? EVENT_OPEN : EVENT_CLOSE,
        {cancelable: true, bubbles: true}
      )
    );
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue === oldValue) {
      return;
    }

    switch (attrName) {
      case 'expanded':
        this[attrName] = this.hasAttribute(attrName);
        break;
    }
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  connectedCallback() {
    ++this.constructor.#idCounter;

    this.contentId = `accordion-content-${this.constructor.#idCounter}`
    this.titleId = `accordion-title-${this.constructor.#idCounter}`

    this.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.addEventListener(EVENT_OPEN, this.open.bind(this));
    this.addEventListener(EVENT_CLOSE, this.close.bind(this));
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    this.#headerEl.removeEventListener('click', this.toggle);
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.expanded = false;
    }
  }

  open() {
    this.setAttribute('expanded', '');
    this.#headerEl.setAttribute('aria-expanded', 'true');
  }

  close() {
    this.removeAttribute('expanded');
    this.#headerEl.setAttribute('aria-expanded', 'false');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .item {
          display: flex;
          flex-direction: column;
        }

        .item__header {
          all: unset;
          cursor: pointer;
          display: grid;
          align-items: center;
          grid-template-columns: 1fr auto;
          grid-gap: 4px;
        }
      </style>
      <div class="item">
        <button
          class="item__header"
          aria-controls="${this.contentId}"
          aria-expanded="${this.expanded ? 'true' : 'false'}"
          part="header"
        >
          <div
            id="${this.titleId}"
            part="label"
          >
            <slot name="label"></slot>
          </div>
          <slot name="icon"></slot>
        </button>
        <div
          id="${this.contentId}"
          class="item__content"
          aria-labelledby="${this.titleId}"
          role="region"
          part="content"
        >
          <slot></slot>
        </div>
      </div>
    `;

    this.#headerEl = this.shadowRoot.querySelector('.item__header');
    this.#headerEl.addEventListener('click', this.toggle);
  }
}

customElements.define('gds-accordion', GdsAccordion);
customElements.define('gds-accordion-item', GdsAccordionItem);

const EVENT_OPEN = 'open';

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

customElements.define('gds-accordion', GdsAccordion);

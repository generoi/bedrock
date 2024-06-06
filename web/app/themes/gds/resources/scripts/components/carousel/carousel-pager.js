import { EVENT_SLIDE } from './carousel';

export class CarouselPager extends HTMLElement {
  #buttons;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    document.addEventListener(EVENT_SLIDE, this.onSlide.bind(this));
    this.render();
  }

  onSlide(e) {
    const { slide } = e.detail;
    const activeTab  = this.#buttons.find((button) => {
      return button.getAttribute('aria-controls') === slide.id;
    });

    if (activeTab) {
      activeTab.setAttribute('aria-selected', 'true');
      this.#buttons
        .filter((button) => button !== activeTab)
        .forEach((button) => button.setAttribute('aria-selected', 'false'));
    }
  }

  onPagerClick(e) {
    const tab = e.target.closest('[role="tab"]');
    const slide = document.getElementById(
      tab.getAttribute('aria-controls')
    );
    const carousel = slide.closest('gds-carousel');
    carousel.slideTo(slide);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-wrap: wrap;
        }
      </style>
      <slot></slot>
    `;

    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'tablist')
    }

    this.dataset.isInitialized = '';
    this.#buttons = this.shadowRoot.querySelector('slot').assignedElements();

    for (const [idx, button] of this.#buttons.entries()) {
      if (!button.getAttribute('role')) {
        button.setAttribute('type', 'button');
        button.setAttribute('role', 'tab');
      }

      if (!button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', `Slide ${idx}`)
      }
      if (!button.getAttribute('aria-selected')) {
        button.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      }

      button.addEventListener('click', this.onPagerClick.bind(this));
    }
  }
}

customElements.define('gds-carousel-pager', CarouselPager);

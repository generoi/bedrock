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
    const tab = e.target.closest('button');
    const slide = document.getElementById(
      tab.getAttribute('aria-controls')
    );
    const carousel = slide.closest('gds-carousel');
    carousel.slideTo(slide);
    slide.focus();
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

    this.dataset.isInitialized = '';
    this.#buttons = this.shadowRoot.querySelector('slot').assignedElements();

    for (const [idx, button] of this.#buttons.entries()) {
      if (!button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', `Go to slide ${idx}`)
      }
      if (!button.getAttribute('aria-current')) {
        button.setAttribute('aria-current', idx === 0 ? 'true' : 'false');
      }

      button.addEventListener('click', this.onPagerClick.bind(this));
    }
  }
}

if (!customElements.get('gds-carousel-pager')) {
  customElements.define('gds-carousel-pager', CarouselPager);
}

import throttle from 'lodash-es/throttle';

export const EVENT_SLIDE = 'carousel.slide';

export class Carousel extends HTMLElement {
  static #idCounter = 0;

  #carousel;
  #slides;
  #buttonNextEl;
  #buttonPrevEl;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    ++this.constructor.#idCounter;

    this.carouselId = `carousel-${this.constructor.#idCounter}`

    this.resizeObserver = this.createResizeObserver();
    this.intersectionObserver = this.createIntersectionObserver();
    this.render();
  }

  createResizeObserver() {
    return new ResizeObserver(
      throttle(this.onResize.bind(this), 500)
    );
  }

  createIntersectionObserver() {
    return new new IntersectionObserver((entries) => {
      for (const {isIntersecting, target} of entries) {
        if (isIntersecting) {
          console.log(target);
        }
      }
    });
  }

  onResize() {
    this.toggleNavigation();
  }

  toggleNavigation() {
    if (!this.hasHiddenSlides()) {
      this.#buttonNextEl?.setAttribute?.('aria-hidden', 'true');
      this.#buttonPrevEl?.setAttribute?.('aria-hidden', 'true');
    } else {
      this.#buttonNextEl?.removeAttribute?.('aria-hidden');
      this.#buttonPrevEl?.removeAttribute?.('aria-hidden');
    }
  }

  columnCount() {
    return getComputedStyle(this).getPropertyValue('--carousel-columns') || 1;
  }

  hasHiddenSlides() {
    return this.#carousel.scrollWidth > this.#carousel.clientWidth;
  }

  isAtEnd() {
    return (this.#carousel.scrollLeft + this.#carousel.clientWidth) >= this.#carousel.scrollWidth;
  }

  currentSlideIdx() {
    const position = this.#carousel.scrollLeft / this.#carousel.clientWidth;
    // @TOOD wont work with multiple columns when skipping to beginning
    return Math.round(position * this.columnCount());
  }

  slide(idx = null) {
    if (idx === null) {
      idx = this.currentSlideIdx();
    }
    return this.#slides.at(idx);
  }

  slideTo(slide) {
    this.#carousel.scrollTo({
      behavior: 'smooth',
      left: slide.offsetLeft,
    });
  }

  slideToNext() {
    let next = this.slide(this.currentSlideIdx() + 1) || this.#slides.at(0);
    if (this.isAtEnd()) {
      next = this.#slides.at(0);
    }
    this.slideTo(next);
  }

  slideToPrev() {
    const prev = this.slide(this.currentSlideIdx() - 1);
    this.slideTo(prev);
  }

  onScroll() {
    const currentSlide = this.slide();

    this.dispatchEvent(
      new CustomEvent(EVENT_SLIDE, {
        cancelable: true,
        bubbles: true,
        detail: { slide: currentSlide },
      })
    );
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          transition: height 0.2s ease;
        }
        .carousel {
          position: relative;
          display: flex;
          flex-wrap: nowrap;
          justify-content: flex-start;
          scroll-snap-type: x mandatory;
          scroll-padding: 0;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          overflow-x: scroll;
          gap: var(--carousel-gutter, 0);
        }

        ::slotted(*) {
          scroll-snap-align: start;
          width: 100%;
          flex-shrink: 0;
          flex-basis: calc(
            100% / var(--carousel-columns, 1) -
            (var(--carousel-gutter, 0) - (1/var(--carousel-columns, 1) * var(--carousel-gutter, 0)))
          );
        }

        ::slotted(:first-child) {
          scroll-snap-align: center;
        }

        .carousel::-webkit-scrollbar {
          display: none;
        }

        .button-next,
        .button-prev {
          all: unset;
          cursor: pointer;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          z-index: 2;
        }

        .button-next[aria-hidden],
        .button-prev[aria-hidden] {
          display: none;
        }

        .button-next:focus-visible,
        .button-prev:focus-visible {
          outline: var(--gds-outline--focus);
        }

        .button-next {
          left: auto;
          right: 0;
        }
      </style>
      <button
        class="button-prev"
        aria-controls="${this.carouselId}"
        aria-label="Previous slide"
        part="button button--prev"
      >
        <slot name="icon-prev"></slot>
      </button>

      <button
        class="button-next"
        aria-controls="${this.carouselId}"
        aria-label="Next slide"
        part="button button--next"
      >
        <slot name="icon-next"></slot>
      </button>

      <div
        class="carousel"
        id="${this.carouselId}"
        aria-live="polite"
        part="carousel"
      >
        <slot></slot>
      </div>
    `;

    this.dataset.isInitialized = '';
    this.#carousel = this.shadowRoot.querySelector('.carousel');
    this.#carousel.addEventListener('scroll', throttle(this.onScroll.bind(this), 500))
    this.#slides = this.#carousel.querySelector('slot').assignedElements();

    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'section');
      this.setAttribute('aria-roledescription', 'carousel');
    }

    for (const [idx, slide] of this.#slides.entries()) {
      if (!slide.getAttribute('aria-label')) {
        slide.setAttribute('aria-label', `${idx + 1} of ${this.#slides.length}`)
      }
      if (!slide.getAttribute('role')) {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
      }
      this.intersectionObserver.observe(slide);
    }

    this.#buttonNextEl = this.shadowRoot.querySelector('.button-next');
    this.#buttonPrevEl = this.shadowRoot.querySelector('.button-prev');
    this.toggleNavigation();

    if (this.#slides.length > 1) {
      this.resizeObserver.observe(this.#carousel);
      this.#buttonNextEl?.addEventListener('click', this.slideToNext.bind(this));
      this.#buttonPrevEl?.addEventListener('click', this.slideToPrev.bind(this));
    }
  }
}

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
    carousel.slideTo(slide);;
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

    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'tablist')
    }

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

customElements.define('gds-carousel', Carousel);
customElements.define('gds-carousel-pager', CarouselPager);

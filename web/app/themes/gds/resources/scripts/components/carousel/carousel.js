import throttle from 'lodash-es/throttle';
import { onIdle } from '../../utils';

export const EVENT_SLIDE = 'carousel.slide';

export class Carousel extends HTMLElement {
  static #idCounter = 0;

  #carousel;
  #slides;
  #buttonNextEl;
  #buttonPrevEl;
  #slideToTarget;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    ++this.constructor.#idCounter;

    this.carouselId = `carousel-${this.constructor.#idCounter}`

    this.resizeObserver = this.createResizeObserver();
    this.render();
    document.addEventListener(EVENT_SLIDE, this.onSlide.bind(this));

  }

  createResizeObserver() {
    return new ResizeObserver(
      throttle(this.onResize.bind(this), 500)
    );
  }

  onResize() {
    this.toggleNavigation();
    this.style.height = `${this.slide().clientHeight}px`;
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
    this.#slideToTarget = slide;
    this.#carousel.scrollTo({
      behavior: 'smooth',
      left: slide.offsetLeft,
    });

    setTimeout(() => this.#slideToTarget = null, 500);
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

    if (currentSlide === this.#slideToTarget || !this.#slideToTarget) {
      this.dispatchEvent(
        new CustomEvent(EVENT_SLIDE, {
          cancelable: true,
          bubbles: true,
          detail: { slide: currentSlide },
        })
      );
    }
  }

  onSlide(e) {
    const { slide } = e.detail;
    // Dynamically resize height
    // @todo hack depends on flex
    this.style.height = `${slide.children[0].clientHeight}px`;

    // Pause other videos
    for (const player of this.querySelectorAll('iframe')) {
      if (slide.contains(player)) {
        console.debug('skip pausing video');
        continue;
      }
      player.contentWindow.postMessage(JSON.stringify({
        'event': 'command',
        'func': 'pauseVideo',
      }), '*');
    }

    // Play video
    slide.querySelector('.embed-youtube__play')?.click();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          overflow-y: hidden;
        }

        @media (prefers-reduced-motion: no-preference) {
          :host {
            transition: height 0.2s ease;
          }

          .carousel {
            transition: height 0.3s ease;
          }
        }

        .carousel {
          position: relative;
          display: flex;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: flex-start;
          scroll-snap-type: x mandatory;
          scroll-padding: 0;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          overflow-x: scroll;
          gap: var(--carousel-gutter, 0);
        }

        ::slotted(*) {
          scroll-snap-align: start;
        }

        ::slotted(:first-child) {
          scroll-snap-align: start;
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
    this.#carousel.addEventListener('scroll', throttle(this.onScroll.bind(this), 100))
    this.#slides = this.#carousel.querySelector('slot').assignedElements();

    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'region');
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

      // CSS snap doesnt like it when DOM changes while scrolling
      // @see https://stackoverflow.com/q/74211636
      if (window.wpImageResizer) {
        onIdle(() => {
          for (const el of slide.querySelectorAll(window.wpImageResizer.selector)) {
            window.wpImageResizer.observer.triggerLoad(el);
          }
        })
      }
    }

    this.#buttonNextEl = this.shadowRoot.querySelector('.button-next');
    this.#buttonPrevEl = this.shadowRoot.querySelector('.button-prev');
    this.toggleNavigation();

    if (this.#slides.length > 1) {
      this.resizeObserver.observe(this.#carousel);
      this.#buttonNextEl?.addEventListener('click', this.slideToNext.bind(this));
      this.#buttonPrevEl?.addEventListener('click', this.slideToPrev.bind(this));

      this.style.height = `${this.#slides[0].clientHeight}px`;
    }
  }
}

customElements.define('gds-carousel', Carousel);

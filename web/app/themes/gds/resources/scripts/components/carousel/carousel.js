import throttle from 'lodash-es/throttle';
import { onIdle } from '../../utils';

export const EVENT_SLIDE = 'carousel.slide';

export class Carousel extends HTMLElement {
  static #idCounter = 0;

  #carousel;
  #buttonNextEl;
  #buttonPrevEl;
  #liveRegion;
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

  reflow(slide) {
    if (! slide) {
      slide = this.slide();
    }
    this.style.height = `${slide.clientHeight}px`;
  }

  createResizeObserver() {
    return new ResizeObserver(
      throttle(this.onResize.bind(this), 500)
    );
  }

  onResize() {
    this.toggleNavigation();
    this.reflow()
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

  slides() {
    return this.#carousel.querySelector('slot').assignedElements();
  }

  slide(idx = null) {
    if (idx === null) {
      idx = this.currentSlideIdx();
    }
    return this.slides().at(idx);
  }

  slideTo(slide) {
    this.#slideToTarget = slide;
    this.#carousel.scrollTo({
      behavior: 'smooth',
      left: slide.offsetLeft,
    });

    setTimeout(() => this.#slideToTarget = null, 500);

    this.updateLiveRegion(slide);
  }

  slideToNext() {
    let next = this.slide(this.currentSlideIdx() + 1) || this.slide(0);
    if (this.isAtEnd()) {
      next = this.slide(0);
    }
    this.slideTo(next);
  }

  slideToPrev() {
    const prev = this.slide(this.currentSlideIdx() - 1);
    this.slideTo(prev);
  }

  updateLiveRegion(slide) {
    const nextIdx = Array.from(this.slides()).indexOf(slide);
    this.#liveRegion.textContent = `Item ${nextIdx + 1} of ${this.slides().length}`;
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
    if (!this.contains(slide)) {
      return;
    }
    // Dynamically resize height
    // @todo hack depends on flex
    this.reflow(slide);

    slide.setAttribute('aria-hidden', 'false');
    for (const el of slide.querySelectorAll('video')) {
      el.removeAttribute('tabindex');
    }

    for (const el of this.slides()) {
      if (el === slide) {
        continue;
      }

      el.setAttribute('aria-hidden', 'true');
      for (const el of slide.querySelectorAll('video')) {
        el.removeAttribute('tabindex');
      }
    }

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
          width: 100%;
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
      <div
        class="carousel"
        id="${this.carouselId}"
        part="carousel"
      >
        <slot></slot>
      </div>

      <button
        class="button-prev"
        aria-controls="${this.carouselId}"
        part="button button--prev"
      >
        <slot name="icon-prev"></slot>
      </button>

      <button
        class="button-next"
        aria-controls="${this.carouselId}"
        part="button button--next"
      >
        <slot name="icon-next"></slot>
      </button>

      <div class="sr-only" aria-live="polite" aria-atomic="true"></div>
    `;

    this.dataset.isInitialized = '';
    this.#carousel = this.shadowRoot.querySelector('.carousel');
    this.#carousel.addEventListener('scroll', throttle(this.onScroll.bind(this), 100))

    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'region');
      this.setAttribute('aria-roledescription', 'carousel');

      if (!this.getAttribute('aria-label')) {
        this.setAttribute('aria-label', 'Carousel');
      }
    }

    const slides = this.slides();
    const columnCount = this.columnCount();
    for (const [idx, slide] of slides.entries()) {
      if (!slide.getAttribute('role')) {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');

        if (!slide.getAttribute('aria-label')) {
          slide.setAttribute('aria-label', `${idx + 1} of ${slides.length}`)
        }
      }

      if (!slide.getAttribute('aria-hidden')) {
        if (idx < columnCount) {
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.setAttribute('aria-hidden', 'true');
        }

        for (const el of slide.querySelectorAll('video')) {
          el.setAttribute('tabindex', '-1');
        }
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
    this.#liveRegion = this.shadowRoot.querySelector('[aria-live="polite"]');
    this.toggleNavigation();

    if (slides.length > 1) {
      this.resizeObserver.observe(this.#carousel);
      this.#buttonNextEl?.addEventListener('click', this.slideToNext.bind(this));
      this.#buttonPrevEl?.addEventListener('click', this.slideToPrev.bind(this));

      this.style.height = `${slides[0].clientHeight}px`;
    }
  }
}

if (!customElements.get('gds-carousel')) {
  customElements.define('gds-carousel', Carousel);
}

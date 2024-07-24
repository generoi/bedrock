const EVENT_PLAY = 'play';
const EVENT_STOP = 'stop';

const desktopMedia = window.matchMedia('(min-width: 700px)');

/**
 * @example
 * <youtube-embed youtube-id="1234">
 *   <img src="...">
 *   <a href="https://youtube.com/1234" slot="button">
 *   </a>
 * </youtube-embed>
 */
export class YoutubeEmbed extends HTMLElement {
  #iframeContainer;
  #buttonEl;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.addEventListener(EVENT_PLAY, this.play.bind(this));
    this.addEventListener(EVENT_STOP, this.stop.bind(this));
    this.render();
  }

  static get observedAttributes() {
    return ['youtube-id', 'playing'];
  }

  get playing() {
    return this.hasAttribute('playing');
  }

  set playing(value) {
    this.dispatchEvent(
      new CustomEvent(
        value ? EVENT_PLAY : EVENT_STOP,
        {cancelable: true, bubbles: true}
      )
    );
  }

  get youtubeId() {
    return this.getAttribute('youtube-id');
  }

  set youtubeId(value) {
    if (value) {
      this.setAttribute('youtube-id', value);
    } else {
      this.removeAttribute('youtube-id');
    }
  }

  toggle() {
    if (this.playing) {
      this.stop();
    } else {
      this.play();
    }
  }

  play() {
    this.#buttonEl.setAttribute('aria-pressed', 'true');
    this.setAttribute('playing', '');
    this.appendIframe();
  }

  stop() {
    this.#buttonEl.setAttribute('aria-pressed', 'false');
    this.removeAttribute('playing', '');
    this.removeIframe();
  }

  appendIframe() {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;');
    // Important: add the autoplay GET parameter, otherwise the user would need to click over the YouTube video again to play it
    iframe.setAttribute('src', `https://www.youtube.com/embed/${this.youtubeId}?rel=0&showinfo=0&autoplay=1`);

    this.removeIframe();
    this.#iframeContainer.appendChild(iframe)
  }

  removeIframe() {
    this.#iframeContainer.innerHTML = '';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .iframe-container iframe {
          position: absolute;
          inset: 0;
          border: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
      </style>

      <slot></slot>

      <div class="iframe-container" part="iframe"></div>

      <div class="button">
        <slot name="button"></slot>
      </div>
    `;

    this.#iframeContainer = this.shadowRoot.querySelector('.iframe-container');

    this.#buttonEl = this.querySelector('[slot="button"]');

    // On desktop make the link into a button that embeds the youtube iframe
    // when pressed.
    if (desktopMedia.matches) {
      this.#buttonEl.removeAttribute('target');
      this.#buttonEl.setAttribute('role', 'button');
      this.#buttonEl.setAttribute('aria-pressed', 'false');
      this.#buttonEl.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    }
  }
}

customElements.define('youtube-embed', YoutubeEmbed);

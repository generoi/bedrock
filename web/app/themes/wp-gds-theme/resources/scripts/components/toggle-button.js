const EVENT_OPEN = 'open';
const EVENT_CLOSE = 'close';

/**
 * @example
 * <toggle-button class="toggler" aria-controls="submenu">
 *   Open
 * </toggle-button>
 * <div class="submenu" id="submenu">
 *   Content
 * </div>
 */
export class ToggleButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.addEventListener(EVENT_OPEN, this.open.bind(this));
    this.addEventListener(EVENT_CLOSE, this.close.bind(this));
    this.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.addEventListener('click', this.toggle.bind(this));

    if (!this.persistent) {
      this.controls.forEach((target) => {
        target.addEventListener('focusout', this.handleTargetContainerBlur.bind(this, target));
        target.addEventListener('keydown', this.handleTargetContainerKeyDown.bind(this));
      });
    }
    this.render();
  }

  static get observedAttributes() {
    return ['aria-expanded', 'aria-controls', 'persistent'];
  }

  get controls() {
    let controls = this.getAttribute('aria-controls');
    if (!controls) {
      return [];
    }
    controls = controls.split(' ').map((target) => document.getElementById(target));
    return controls;
  }

  get persistent() {
    return this.hasAttribute('persistent');
  }

  get expanded() {
    return this.getAttribute('aria-expanded') === 'true';
  }

  set expanded(value) {
    this.dispatchEvent(
      new CustomEvent(
        value ? EVENT_OPEN : EVENT_CLOSE,
        {cancelable: true, bubbles: true}
      )
    );
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  open() {
    this.setAttribute('aria-expanded', true);
    this.controls.forEach((target) => target.classList.add('is-active'))
  }

  close() {
    this.setAttribute('aria-expanded', false);
    this.controls.forEach((target) => target.classList.remove('is-active'))
  }

  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  handleTargetContainerKeyDown(event) {
    if (event.key === 'Escape') {
      this.expanded = false;
    }
  }

  handleTargetContainerBlur(container, event) {
    const newFocusElement = event.relatedTarget;
    if (newFocusElement && !container.contains(newFocusElement)) {
      this.close();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <slot/>
    `;

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('aria-expanded')) {
      this.setAttribute('aria-expanded', 'false');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }
}

customElements.define('toggle-button', ToggleButton);

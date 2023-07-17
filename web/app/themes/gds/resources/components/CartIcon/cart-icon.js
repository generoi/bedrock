import './cart-icon.scss'

export class CartIcon extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['count'];
  }

  connectedCallback() {
    if (!this.#hasItemsInCart) {
      this.count = 0;
    } else {
      this.count = this.#readItemCount();
    }

    this.render();
  }

  get count() {
    return this.getAttribute('count');
  }

  set count(value) {
    if (value === 0)  {
      this.removeAttribute('count');
    } else {
      this.setAttribute('count', value || '');
    }
  }

  #hasItemsInCart () {
    return document.cookie.includes('woocommerce_items_in_cart');
  }

  #readItemCount() {
    if (!this.#hasItemsInCart) {
      return 0;
    }
    return (document.cookie.match(/wp_user_cart_count=([0-9]+)/) || [])[1];
  }

  #formatCount(count) {
    if (!count) {
      return '';
    }
    return count > 9 ? '' : count;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
        }
        .counter {
          display: none;
        }
      </style>

      <div>
        <slot name="cart-icon"></slot>
        ${this.count !== 0 && (
          `<span class="counter" part="counter ${!this.#formatCount(this.count) ? 'empty': ''}">${this.#formatCount(this.count)}</span>`
        ) || ''}
      </div>
    `;

    this.dataset.isInitialized = '';
  }
}

customElements.define('cart-icon', CartIcon);



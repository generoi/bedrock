import Edit from "./edit";

const EVENT_OPEN = 'open';
const EVENT_CLOSE = 'close';

export class GdsTabs extends HTMLElement {
  #tabs;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.addEventListener(EVENT_OPEN, this.open.bind(this));
    this.addEventListener(EVENT_CLOSE, this.close.bind(this));
    this.addEventListener('click', this.handleTabClick.bind(this));

    this.render();
  }

  createEvent(event) {
    return new CustomEvent(event, {cancelable: true, bubbles: true});
  }

  handleTabClick(e) {
    const tab = e.target;
    if (!this.#tabs.includes(tab)) {
      return;
    }

    const isPreviouslySelected = tab.getAttribute('aria-selected') === 'true';
    const isSelected = !isPreviouslySelected;

    // Dont allow closing, only opening
    if (isSelected) {
      tab.dispatchEvent(this.createEvent(EVENT_OPEN));
    }
  }

  open(e) {
    const tab = e.target;
    tab.setAttribute('aria-selected', 'true');

    const controls = tab.getAttribute('aria-controls');
    const tabContent = document.getElementById(controls);
    tabContent.classList.add('is-active');

    Array.from(this.shadowRoot.querySelector('slot[name="tab"]').assignedElements())
      .filter((item) => item !== tab)
      .forEach((item) => item.dispatchEvent(this.createEvent(EVENT_CLOSE)));
  }

  close(e) {
    const tab = e.target;
    tab.setAttribute('aria-selected', 'false');

    const controls = tab.getAttribute('aria-controls');
    document.getElementById(controls).classList.remove('is-active');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
        }

        [role="tablist"] {
          display: flex;
          flex-wrap: nowrap;
        }

        slot[name="content"]::slotted(:not(.is-active)) {
          display: none;
        }
      </style>

      <div role="tablist">
        <slot name="tab"></slot>
      </div>

      <div class="tab-content">
        <slot name="content"></slot>
      </div>
    `;

    this.#tabs = Array.from(this.shadowRoot.querySelector('slot[name="tab"]').assignedElements());

    const activeTab = this.#tabs.find((el) => el.getAttribute('aria-selected') === 'true');
    if (!activeTab) {
      this.#tabs.at(0).dispatchEvent(
        this.createEvent(EVENT_OPEN)
      );
    }
  }
}

customElements.define('gds-tabs', GdsTabs);


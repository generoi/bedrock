export class SubForm extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  onSubmit(e) {
    if (!this.contains(e.submitter)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();

    const form = this.buildForm();
    form.classList.add('sr-only');
    document.body.appendChild(form);
    form.querySelector('[type="submit"]').click();
  }

  buildForm() {
    const form = document.createElement('form');
    [...this.attributes].forEach(attribute => {
      form.setAttribute(attribute.nodeName, attribute.nodeValue);
    });
    for (const child of this.children) {
      form.appendChild(child.cloneNode(true));
    }
    return form;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
      </style>

      <slot/>
    `;

    const parentForm = this.closest('form');
    if (parentForm) {
      parentForm.addEventListener('submit', this.onSubmit.bind(this));
    } else {
      this.replaceWith(this.buildForm());
    }
  }
}

customElements.define('sub-form', SubForm);

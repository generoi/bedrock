import {ready} from '~/utils';

ready(() => {
  for (const container of document.querySelectorAll('form.variations_form')) {
    bind(container);
  }
})

function template({variation_description, availability_html}) {
  return `
    ${variation_description && (
      `<div class="woocommerce-variation-description">${ variation_description }</div>`
    ) || ''}
    ${availability_html && (
      `<div class="woocommerce-variation-availability">${ availability_html }</div>`
    ) || ''}
  `.trim();
}

function bind(form) {
  const variations = JSON.parse(form.dataset.product_variations || '[]');
  const submitButton = form.querySelector('[type="submit"]');
  const quantityInput = form.querySelector('input.qty');
  const resetButton = form.querySelector('.reset_variations');
  const attributeFields = Array.from(form.elements).filter(i => !!i.dataset.attribute_name);
  const price = form.closest('.product').querySelector('.price');
  const originalPriceHtml = price.innerHTML;
  const variationContainer = form.querySelector('.single_variation');

  function getSelectedAttributes() {
    return attributeFields.reduce((carry, input) => {
      const attribute = input.dataset.attribute_name;
      if (input.value) {
        carry[attribute] = input.value;
      }
      return carry;
    }, {});
  }

  function findVariation(attributes) {
    return variations.find((variation) => {
      for (const [attribute, value] of Object.entries(variation.attributes)) {
        if (value !== attributes[attribute]) {
          return false;
        }
      }
      return true;
    })
  }

  function findPartialVariation(attributes) {
    return variations.find((variation) => {
      if (!variation.is_purchasable) {
        return false;
      }

      for (const [attribute, value] of Object.entries(attributes)) {
        if (value !== variation.attributes[attribute]) {
          return false;
        }
      }
      return true;
    })
  }

  function disableUnavailableOptions(attributes) {
    for (const input of attributeFields) {
      const attribute = input.dataset.attribute_name;
      if (input.tagName.toLowerCase() !== 'select') {
        continue;
      }

      for (const option of input.options) {
        if (!option.value) {
          continue;
        }

        const hasVariation = findPartialVariation({
          ...attributes,
          [attribute]: option.value
        });

        if (hasVariation) {
          option.removeAttribute('disabled', '');
        } else {
          option.setAttribute('disabled', '');
        }
      }
    }
  }

  function update() {
    const attributes = getSelectedAttributes();
    const selectedVariation = findVariation(attributes);
    // Set the variation id required for form submit.
    form.variation_id.value = selectedVariation?.variation_id || 0;

    // Update the displayed price
    price.innerHTML = selectedVariation?.price_html || originalPriceHtml;

    // Toggle "Clear" button
    resetButton.classList.toggle('is-visible', Object.values(attributes).length > 0);

    // Dynamically disable options that become unavailable
    disableUnavailableOptions(attributes);

    // Toggle submit button state
    if (selectedVariation) {
      variationContainer.innerHTML = template(selectedVariation);

      quantityInput.setAttribute('min', selectedVariation.min_qty);
      quantityInput.setAttribute('max', selectedVariation.max_qty);

      if (!selectedVariation.is_in_stock) {
        submitButton.setAttribute('disabled', '');
        quantityInput.setAttribute('disabled', '');
      } else {
        submitButton.removeAttribute('disabled');
        quantityInput.removeAttribute('disabled');
      }
    } else {
      variationContainer.innerHTML = '';
      submitButton.setAttribute('disabled', '');
      quantityInput.setAttribute('min', '');
      quantityInput.setAttribute('max', '');
      quantityInput.setAttribute('disabled', '');
    }
  }

  resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    form.reset();
    update();
  })

  update();
  form.addEventListener('change', update)
}


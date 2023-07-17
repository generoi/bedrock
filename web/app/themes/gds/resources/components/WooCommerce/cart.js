import {ready} from '~/utils';

ready(() => {
  const form = document.querySelector('.woocommerce-cart-form');
  if (!form) {
    return;
  }

  const updateButton = document.querySelector('[data-cart-update-button]');

  function onCartChange() {
    const submitButton = document.querySelector('.wc-proceed-to-checkout');

    submitButton.classList.add('is-hidden');
    updateButton.classList.remove('is-hidden');
  }

  function onFragmentChange() {
    const submitButton = document.querySelector('.wc-proceed-to-checkout');

    if (!updateButton.classList.contains('is-hidden')) {
      submitButton.classList.add('is-hidden');
    }
  }

  form.addEventListener('change', onCartChange, {once: true});
  window.jQuery?.(document.body).on?.('updated_cart_totals', onFragmentChange);

  updateButton.addEventListener('click', () => {
    form.submit();
  })
});

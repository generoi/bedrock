import {ready} from '~/utils';

function onChange({target}) {
  const value = target.value;
  const name = target.name;

  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.location.search = params.toString();
}

ready(() => {
  console.log('foo');
  for (const select of document.querySelectorAll('.woocommerce-ordering select')) {
    select.addEventListener('change', onChange);
  }
});

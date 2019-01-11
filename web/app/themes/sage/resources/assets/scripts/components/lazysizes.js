import lazySizes from 'lazysizes';

export default function(options = {}) {
  window.lazySizesConfig = Object.assign(window.lazySizesConfig || {}, {
    preloadAfterLoad: true,
  }, options);

  lazySizes.init();
}

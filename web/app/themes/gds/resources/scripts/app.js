import {onIdle, ready} from './utils';
import initPrefersReducedMotion from './components/prefers-reduced-motion';

import('./components/toggle-button');

ready(() => {
  if (document.querySelector('modal-dialog')) {
    import('./components/modal-dialog');
  }

  if (document.querySelector('youtube-embed')) {
    onIdle(() => import('@components/youtube-embed'));
  }

  initPrefersReducedMotion();
});

ready(() => {
  if (document.querySelector('gds-carousel, gds-carousel-pager')) {
    import('./components/carousel');
  }
});

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error);

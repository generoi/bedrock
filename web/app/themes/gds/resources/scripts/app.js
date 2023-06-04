import swiper from './components/swiper'
import {onIdle} from './utils'
import './components/toggle-button';
import './components/toast-notice';
import './components/carousel';
import './components/sub-form';
import { lazyLoad } from './components/lazy-load';
import fontawesome from './components/fontawesome';

fontawesome();

if (document.querySelector('modal-dialog')) {
  import('./components/modal-dialog');
}

if (document.querySelector('youtube-embed')) {
  onIdle(() => import('@components/youtube-embed'));
}

// app.js is loaded at the end of body, so don't wait for document ready.
for (const container of document.body.querySelectorAll('.swiper-container')) {
  swiper(container);
}

// app.js is loaded at the end of body, so don't wait for document ready.
for (const el of document.querySelectorAll('video[data-src], iframe[data-src]')) {
  lazyLoad(el);
}

import swiper from './components/swiper'
import {onIdle} from './utils'
import './components/toggle-button';
import './components/modal-dialog';
import { lazyLoad } from './components/lazy-load';
import fontawesome from './components/fontawesome';
import cookieConsent from '@components/cookie-consent';

fontawesome();

if (document.querySelector('youtube-embed')) {
  onIdle(() => import('@components/youtube-embed'));
}

cookieConsent(document.querySelector('.cookie-consent'));

// app.js is loaded at the end of body, so don't wait for document ready.
for (const container of document.body.querySelectorAll('.swiper-container')) {
  swiper(container);
}

// app.js is loaded at the end of body, so don't wait for document ready.
for (const el of document.querySelectorAll('video[data-src], iframe[data-src]')) {
  lazyLoad(el);
}

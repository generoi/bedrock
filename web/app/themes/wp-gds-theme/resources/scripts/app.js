import swiper from './components/swiper'
import {onIdle} from './utils'
import './components/toggle-button';

if (document.querySelector('youtube-embed')) {
  onIdle(() => import('./components/youtube-embed'));
}

// app.js is loaded at the end of body, so don't wait for document ready.
for (const container of document.body.querySelectorAll('.swiper-container')) {
  swiper(container);
}

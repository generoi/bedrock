import swiper from './components/swiper'
import {onIdle, ready} from './utils'
import './components/toggle-button';
import './components/modal-dialog';
import { lazyLoad } from './components/lazy-load';
import fontawesome from './components/fontawesome';

fontawesome();

ready(() => {
  if (document.querySelector('youtube-embed')) {
    onIdle(() => import('@components/youtube-embed'));
  }

  for (const container of document.body.querySelectorAll('.swiper-container')) {
    swiper(container);
  }

  for (const el of document.querySelectorAll('video[data-src], iframe[data-src]')) {
    lazyLoad(el);
  }
})

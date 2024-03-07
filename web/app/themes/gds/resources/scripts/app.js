import swiper from './components/swiper'
import {onIdle, ready} from './utils'
import './components/toggle-button';

ready(() => {
  if (document.querySelector('modal-dialog')) {
    import('./components/modal-dialog');
  }

  // @todo
  // if (document.querySelector('youtube-embed')) {
  //   onIdle(() => import('@components/youtube-embed'));
  // }

  for (const container of document.body.querySelectorAll('.swiper-container')) {
    swiper(container);
  }
})

ready(() => {
  if (document.querySelector('gds-carousel, gds-carousel-pager')) {
    import('./components/carousel');
  }
})

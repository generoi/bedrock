import swiper from './components/swiper'
import './components/accordion';

// app.js is loaded at the end of body, so don't wait for document ready.
for (const container of document.body.querySelectorAll('.swiper-container')) {
  swiper(container);
}

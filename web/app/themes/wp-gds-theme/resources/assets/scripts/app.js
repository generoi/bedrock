/**
 * External Dependencies
 */
import SwiperCore, {Navigation, Pagination, A11y, Swiper} from 'swiper'

// Initialize all Swiper carousels on the page.
SwiperCore.use([Navigation, Pagination, A11y])

// app.js is loaded at the end of body, so don't wait for document ready.
const swiperContainers = document.body.querySelectorAll('.swiper-container')
for (let i = 0; i < swiperContainers.length; i++) {
  let settings = JSON.parse(swiperContainers[i].dataset.swiper || '{}')
  new Swiper(swiperContainers[i], settings)
}

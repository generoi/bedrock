export async function getSwiper() {
  const { default: SwiperCore, Navigation, Pagination, A11y, Swiper } = await import(
    /* webpackChunkName: "components/swiper" */
    /* webpackExports: ["default", "Navigation", "Pagination", "A11y", "Swiper"] */
    'swiper'
  )

  import(/* webpackChunkName: "components/swiper-styles" */ 'swiper/swiper.scss');
  import(/* webpackChunkName: "components/swiper-styles" */ 'swiper/components/navigation/navigation.scss');
  import(/* webpackChunkName: "components/swiper-styles" */ 'swiper/components/pagination/pagination.scss');

  SwiperCore.use([Navigation, Pagination, A11y])

  return Swiper;
}

export default async function init(container) {
  const Swiper = await getSwiper();

  const settings = JSON.parse(container.dataset.swiper || '{}')
  return new Swiper(container, settings);
}

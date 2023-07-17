const IS_EDITOR = !! window.adminpage;

export const DEFAULT_SWIPER_SETTINGS = {
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}

export default async function init(container, settings = null) {
  if (container.classList.contains('swiper-initialized')) {
    return container.swiper;
  }

  const { default: Swiper } = await import(
    /* webpackChunkName: "components/swiper" */
    'swiper'
  );

  const { Navigation, A11y, Pagination } = await import(
    /* webpackChunkName: "components/swiper" */
    /* webpackExports: ["Navigation", "A11y", "Pagination"] */
    'swiper/modules'
  );

  import(/* webpackChunkName: "components/swiper" */ 'swiper/scss');
  import(/* webpackChunkName: "components/swiper" */ 'swiper/scss/navigation');
  import(/* webpackChunkName: "components/swiper" */ 'swiper/scss/pagination');

  return new Swiper(container, {
    modules: [Navigation, A11y, Pagination],
    allowTouchMove: !IS_EDITOR,
    ...(settings || DEFAULT_SWIPER_SETTINGS),
    ...JSON.parse(container.dataset.swiper || '{}'),
  });
}

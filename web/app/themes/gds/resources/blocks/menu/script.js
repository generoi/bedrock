import {ready} from '@scripts/utils.js';

const DESKTOP_MENU_QUERY = '(min-width: 1024px)';
const NESTED_SUBMENU_MIN_WIDTH = 200;

function getSiblingTogglers(button) {
  const menuItem = button.closest('.wp-block-gds-menu-item');
  const container = menuItem?.parentElement;

  if (!container) {
    return [];
  }

  return [
    ...container.querySelectorAll(
      ':scope > .wp-block-gds-menu-item > .wp-block-gds-menu-item__toggle',
    ),
  ];
}

function updateFlyoutDirection(menuItem) {
  const submenu = menuItem.querySelector(
    ':scope > .wp-block-gds-menu-item__submenu',
  );

  if (!submenu) {
    return;
  }

  menuItem.classList.remove('opens-right');

  const rect = menuItem.getBoundingClientRect();

  if (rect.width === 0) {
    return;
  }

  const submenuWidth = Math.max(submenu.offsetWidth, NESTED_SUBMENU_MIN_WIDTH);

  if (rect.left < submenuWidth) {
    menuItem.classList.add('opens-right');
  }
}

function resetFlyoutDirection(menuItem) {
  menuItem.classList.remove('opens-right');
}

function setupFlyoutDirection(context) {
  const mediaQuery = window.matchMedia(DESKTOP_MENU_QUERY);

  const getNestedItems = () =>
    context.querySelectorAll(
      '.wp-block-gds-menu-item__submenu > .wp-block-gds-menu-item.has-child',
    );

  const resetAll = () => {
    getNestedItems().forEach((item) => {
      resetFlyoutDirection(item);
    });
  };

  const updateVisible = () => {
    if (!mediaQuery.matches) {
      resetAll();
      return;
    }

    getNestedItems().forEach((item) => {
      if (item.matches(':hover')) {
        updateFlyoutDirection(item);
      }
    });
  };

  const bindItems = () => {
    getNestedItems().forEach((item) => {
      if (item.dataset.flyoutBound === 'true') {
        return;
      }

      item.dataset.flyoutBound = 'true';
      item.addEventListener('mouseenter', () => updateFlyoutDirection(item));
      item.addEventListener('mouseleave', () => resetFlyoutDirection(item));
    });
  };

  bindItems();
  resetAll();

  mediaQuery.addEventListener('change', () => {
    bindItems();
    resetAll();
  });
  window.addEventListener('resize', updateVisible);
}

function setupSubmenuToggleHandlers(context = document) {
  const togglers = context.querySelectorAll('.wp-block-gds-menu-item__toggle');

  for (const button of togglers) {
    button.addEventListener(
      'click',
      () => {
        const wasExpanded = button.getAttribute('aria-expanded') === 'true';

        if (!wasExpanded) {
          getSiblingTogglers(button)
            .filter((toggler) => toggler !== button)
            .forEach((toggler) => {
              toggler.expanded = false;
            });
        }
      },
      true,
    );
  }
}

function onClickOutside(event) {
  const target = event.target;
  const container = document.querySelector('.header');
  const form = target.closest('form');

  if (!container || (container.contains(target) && !form)) {
    return;
  }

  const togglers = container.querySelectorAll(
    '.wp-block-gds-menu-item__toggle[aria-expanded="true"]',
  );

  for (const button of togglers) {
    button.expanded = false;
  }
}

ready(() => {
  const container = document.querySelector('.header__navigation');

  if (!container) {
    return;
  }

  setupSubmenuToggleHandlers(container);
  setupFlyoutDirection(container);

  window.addEventListener('click', onClickOutside, {passive: true});
});

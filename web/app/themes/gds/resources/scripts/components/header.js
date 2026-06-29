import {ready} from '../utils';

const EVENT_OPEN = 'toggle.open';
const EVENT_CLOSE = 'toggle.close';

function getFocusableElements(container) {
  return [
    ...container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ].filter(
    (element) =>
      element.offsetParent !== null || element === document.activeElement,
  );
}

ready(() => {
  const header = document.getElementById('header');
  const toggler = header?.querySelector('.header__menu-toggler');

  if (!header || !toggler) {
    return;
  }

  const label = toggler.querySelector('.header__menu-toggler-label');
  const openLabel = toggler.getAttribute('data-label-open') || 'Open menu';
  const closeLabel = toggler.getAttribute('data-label-close') || 'Close menu';

  const setMenuOpen = (isOpen) => {
    document.body.classList.toggle('is-menu-open', isOpen);

    if (isOpen) {
      header.setAttribute('role', 'dialog');
      header.setAttribute('aria-modal', 'true');
      header.setAttribute('aria-labelledby', 'header-menu-toggler-label');
    } else {
      header.removeAttribute('role');
      header.removeAttribute('aria-modal');
      header.removeAttribute('aria-labelledby');
    }

    toggler.setAttribute('aria-label', isOpen ? closeLabel : openLabel);

    if (label) {
      label.textContent = isOpen ? closeLabel : openLabel;
    }
  };

  toggler.addEventListener(EVENT_OPEN, () => {
    setMenuOpen(true);

    const firstFocusable = getFocusableElements(header).find(
      (element) => element !== toggler,
    );

    firstFocusable?.focus();
  });

  toggler.addEventListener(EVENT_CLOSE, () => {
    setMenuOpen(false);

    header
      .querySelectorAll('.wp-block-gds-menu-item__toggle[aria-expanded="true"]')
      .forEach((button) => {
        button.expanded = false;
      });

    toggler.focus();
  });

  header.addEventListener('keydown', (event) => {
    if (!header.classList.contains('is-active')) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      toggler.expanded = false;
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusable = getFocusableElements(header);

    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  setMenuOpen(false);
});

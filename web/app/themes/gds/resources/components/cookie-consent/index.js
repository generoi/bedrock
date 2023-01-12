import { getCookie, setCookie } from '~/utils';

/**
 * Cookie format: (version,consent1,consent2,consent3,consent4)  Example(String): "1,1,1,0,1"
 */
const COOKIE_NAME = 'gds-consent';
const VERSION = 1;

function parseConsentString(consentString) {
  const values = consentString?.split(',') || [];
  values.shift(); // remove version number;
  return values;
}

function buildConsentString(values) {
  values.unshift(VERSION);
  return values.join(',');
}

export default function init(modal) {
  const acceptSelectedEl = modal.querySelector('[data-cookie-consent-accept-selected]');
  const acceptAllEl = modal.querySelector('[data-cookie-consent-accept-all]');
  const inputs = Array.from(modal.querySelectorAll('input[name="cookie-consent"]'));

  // Avoid checkboxes being checked toggling the accordion
  for (const input of inputs) {
    input.addEventListener('click', (e) => e.stopPropagation());
  }

  const consents = parseConsentString(
    getCookie(COOKIE_NAME)
  );

  // Display the modal if there's no cookie
  if (!consents.length) {
    modal.visible = true;
  }

  // Pre-fill the inputs according to the cookie value
  consents.forEach((consent, idx) => {
    inputs.at(idx).checked = consent;
  });

  // Accept selected cookies and close modal
  acceptSelectedEl.addEventListener('click', () => {
    const consentString = buildConsentString(inputs.map(input => input.checked ? 1 : 0))
    setCookie(COOKIE_NAME, consentString);

    modal.hide();
  });

  // Accept all cookies and close modal
  acceptAllEl.addEventListener('click', () => {
    const consentString = buildConsentString(inputs.map(input => 1))
    setCookie(COOKIE_NAME, consentString);

    modal.hide();
  });
}

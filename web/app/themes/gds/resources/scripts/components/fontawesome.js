import {
  register,
  InjectCSS,
  ReplaceElements,
} from '@fortawesome/fontawesome-svg-core/plugins'

import {
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

import {
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faMagnifyingGlass,
  faXmark,
  faCheck,
  faChevronsRight,
} from '@fortawesome/pro-solid-svg-icons'

import {
  faShareNodes,
  faEnvelope,
  faLink,
} from '@fortawesome/pro-regular-svg-icons'

const api = register([InjectCSS, ReplaceElements]);

api.library.add(
  // Regular
  faEnvelope,
  faShareNodes,
  faLink,
  // Solid
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faMagnifyingGlass,
  faXmark,
  faCheck,
  faChevronsRight,
  // Brands
  faFacebook,
  faTwitter,
  faYoutube,
);

api.config.showMissingIcons = false;

export default function () {
  api.dom.watch();
}

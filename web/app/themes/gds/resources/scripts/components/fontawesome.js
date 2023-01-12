import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
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

library.add(
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

config.showMissingIcons = false;

export default function () {
  dom.watch();
}

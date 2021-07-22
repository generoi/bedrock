import '@wordpress/edit-post';
import domReady from '@wordpress/dom-ready';
import {
  registerBlockStyle,
  registerBlockCollection,
} from '@wordpress/blocks';

import './editor/blocks/gds-media-card/index';
import './editor/blocks/slideshow-slide/index';
import './editor/blocks/slideshow/index';

registerBlockCollection('gds', { title: 'Genero Design System' } );

domReady(() => {
  registerBlockStyle('core/social-links', {
    name: 'monochrome',
    label: 'Monochrome',
  });

  registerBlockStyle('core/gallery', {
    name: 'logo-grid',
    label: 'Logo Grid',
  });
});

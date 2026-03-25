import domReady from '@wordpress/dom-ready';
import {
  registerBlockStyle,
  unregisterBlockStyle,
  registerBlockCollection,
} from '@wordpress/blocks';

import './editor/block-variations/core-query';
import './editor/filters/with-handpicked-posts';
import './editor/filters/with-namespace-attribute';
import './editor/filters/with-group-grid-columns';

registerBlockCollection('gds', {title: 'Genero Design System'});

domReady(() => {
  registerBlockStyle('core/list', {
    name: 'spacious',
    label: 'Spacious',
  });
  registerBlockStyle('core/columns', {
    name: 'media-text',
    label: 'Media & Text',
  });

  // Unregister Default Blocks Styles
  unregisterBlockStyle('core/separator', 'dots');
  unregisterBlockStyle('core/separator', 'wide');
});

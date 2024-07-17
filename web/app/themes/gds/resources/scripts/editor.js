import domReady from '@wordpress/dom-ready';
import {
  registerBlockStyle,
  unregisterBlockStyle,
  registerBlockCollection,
} from '@wordpress/blocks';

import './editor/block-variations/core-query'
import './editor/filters/with-handpicked-posts'

registerBlockCollection('gds', { title: 'Genero Design System' } );

domReady(() => {
  registerBlockStyle('core/list', {
    name: 'spacious',
    label: 'Spacious',
  });

});

// @see https://github.com/WordPress/gutenberg/issues/25330
window._wpLoadBlockEditor.then(() => {
  // Unregister Default Blocks Styles
  unregisterBlockStyle('core/separator', 'dots');
  unregisterBlockStyle('core/separator', 'wide');
});

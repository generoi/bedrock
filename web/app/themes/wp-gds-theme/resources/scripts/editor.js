import '@wordpress/edit-post';
import domReady from '@wordpress/dom-ready';
import {
  unregisterBlockStyle,
  registerBlockCollection,
} from '@wordpress/blocks';

registerBlockCollection('gds', { title: 'Genero Design System' } );

domReady(() => {
});

// @see https://github.com/WordPress/gutenberg/issues/25330
window._wpLoadBlockEditor.then(() => {
  // Unregister Default Blocks Styles
  unregisterBlockStyle('core/separator', 'dots');
  unregisterBlockStyle('core/separator', 'wide');
});

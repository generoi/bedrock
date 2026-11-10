import domReady from '@wordpress/dom-ready';
import {unregisterBlockStyle, registerBlockCollection} from '@wordpress/blocks';

import './editor/block-variations/core-query';
import './editor/filters/with-handpicked-posts';
import './editor/filters/with-namespace-attribute';
import './editor/filters/with-group-grid-columns';
import './editor/filters/with-columns-gap';

registerBlockCollection('gds', {title: 'Genero Design System'});

domReady(() => {
  // Unregister Default Blocks Styles
  unregisterBlockStyle('core/separator', 'dots');
  unregisterBlockStyle('core/separator', 'wide');
});

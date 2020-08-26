import '@wordpress/edit-post';
import domReady from '@wordpress/dom-ready';
import {
  registerBlockStyle,
  registerBlockCollection,
} from '@wordpress/blocks';
import { createHigherOrderComponent} from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

import './editor/blocks/gds-media-card/index';
import './editor/blocks/slideshow-slide/index';
import './editor/blocks/slideshow/index';

registerBlockCollection('gds', { title: 'Genero Design System' } );

domReady(() => {
  registerBlockStyle('core/media-text', {
    name: 'default',
    label: 'Default',
    isDefault: true,
  });

  registerBlockStyle('core/media-text', {
    name: 'hero',
    label: 'Hero',
  });

  registerBlockStyle('core/media-text', {
    name: 'two-thirds',
    label: 'Two Thirds Content',
  });

  registerBlockStyle('core/heading', {
    name: 'floating',
    label: 'Floating',
  });

  registerBlockStyle('core/social-links', {
    name: 'monochrome',
    label: 'Monochrome',
  });

  registerBlockStyle('core/gallery', {
    name: 'logo-grid',
    label: 'Logo Grid',
  });

  addFilter(
    'editor.BlockListBlock',
    'sage/group-default-background',
    createHigherOrderComponent((BlockListBlock) => {
      return (props) => {
        if (
          props.name === 'core/group' &&
          !props.attributes.backgroundColor
        ) {
          props.attributes.backgroundColor = 'light-blue';
        }
        return <BlockListBlock { ...props } />;
      };
    })
  );
});

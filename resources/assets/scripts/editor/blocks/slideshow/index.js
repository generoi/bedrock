/** @wordpress */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

import edit from './edit'
import { name, category, attributes, supports } from './block.json';

registerBlockType(name, {
  title: __('Slideshow'),
  description: __('Display content in a slideshow'),
  icon: 'image-flip-horizontal',
  category: category,
  supports,
  attributes,
  edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

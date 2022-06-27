/** @wordpress */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

import edit from './edit'
import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  title: __('Slideshow'),
  description: __('Display content in a slideshow'),
  icon: 'image-flip-horizontal',
  edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

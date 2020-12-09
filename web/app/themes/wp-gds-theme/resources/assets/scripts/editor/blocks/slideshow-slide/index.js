/** @wordpress */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

import edit from './edit'
import { name, category, supports, apiVersion } from './block.json';

registerBlockType(name, {
  apiVersion,
  title: __('Slideshow Slide'),
  description: __('Display content in a slideshow'),
  icon: 'image-flip-horizontal',
  parent: ['gds/slideshow'],
  category,
  supports,
  edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

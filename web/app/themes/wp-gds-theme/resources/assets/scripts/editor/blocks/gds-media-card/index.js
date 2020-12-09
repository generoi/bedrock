/** @wordpress */
import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

/** course-summary components */
import edit from './edit'
import { name, category, supports, attributes, apiVersion } from './block.json';

registerBlockType(name, {
  apiVersion,
  title: __('Media Card'),
  description: __('Display a card with media and text'),
  category,
  supports,
  attributes,
  edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

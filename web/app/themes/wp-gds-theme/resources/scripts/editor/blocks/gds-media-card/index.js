/** @wordpress */
import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

/** course-summary components */
import edit from './edit'
import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  title: __('Media Card'),
  description: __('Display a card with media and text'),
  edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

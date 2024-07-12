/** @wordpress */
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

import edit from './edit'
import variations from './variations'
import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  variations,
  edit,
  save() {
    return <InnerBlocks.Content />;
  },
});


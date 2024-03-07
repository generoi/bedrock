/** @wordpress */
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'
import { createBlock } from '@wordpress/blocks';

import edit from './edit'
import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  edit,
  save() {
    return <InnerBlocks.Content />;
  },
});


/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks} from '@wordpress/block-editor';
import {createBlock} from '@wordpress/blocks';

import edit from './edit';
import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  edit,
  save() {
    return <InnerBlocks.Content />;
  },
  transforms: {
    from: [
      {
        type: 'block',
        blocks: ['core/media-text'],
        transform: (attributes, innerBlocks) => {
          return createBlock(meta.name, attributes, innerBlocks);
        },
      },
    ],
    to: [
      {
        type: 'block',
        blocks: ['core/media-text'],
        transform: (attributes, innerBlocks) => {
          return createBlock('core/media-text', attributes, innerBlocks);
        },
      },
    ],
  },
});

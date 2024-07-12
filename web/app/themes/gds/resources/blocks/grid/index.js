/** @wordpress */
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'
import { createBlock } from '@wordpress/blocks';

import edit from './edit'
import variations from './variations'
import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  edit,
  variations,
  save() {
    return <InnerBlocks.Content />;
  },
  transforms: {
    from: [
      {
        type: 'block',
        blocks: ['core/columns'],
        transform: (attributes, innerBlocks) => {
          attributes.columns = innerBlocks.length;

          return createBlock(
            meta.name,
            attributes,
            innerBlocks.map((columnBlock) => {
              if (columnBlock.innerBlocks.length === 1) {
                return columnBlock.innerBlocks[0];
              }
              // Wrap it in a group
              return createBlock('core/group', columnBlock.attributes, columnBlock.innerBlocks);
            }),
          );
        },
      },
    ],
    to: [
      {
        type: 'block',
        blocks: ['core/columns'],
        transform: (attributes, innerBlocks) => {
          return createBlock(
            'core/columns',
            attributes,
            innerBlocks.map((innerBlock) => {
              return createBlock('core/column', {}, [innerBlock]);
            }),
          );
        },
      },
    ],
  },
});

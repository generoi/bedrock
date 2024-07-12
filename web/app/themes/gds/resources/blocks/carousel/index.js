/** @wordpress */
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'
import { createBlock } from '@wordpress/blocks';

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
  transforms: {
    from: [
      {
        type: 'block',
        blocks: ['gds/grid'],
        transform: (attributes, innerBlocks) => {
          if (attributes.columns) {
            attributes.columnCount = attributes.columns;
            delete attributes.columns;
          }

          return createBlock(
            meta.name,
            attributes,
            innerBlocks.map((innerBlock) => {
              return createBlock('gds/carousel-item', {}, [innerBlock]);
            }),
          );
        },
      },
      {
        type: 'block',
        blocks: ['core/columns'],
        transform: (attributes, innerBlocks) => {
          attributes.columnCount = innerBlocks.length;

          return createBlock(
            meta.name,
            attributes,
            innerBlocks.map((innerBlock) => {
              return createBlock('gds/carousel-item', innerBlock.attributes, innerBlock.innerBlocks);
            }),
          );
        },
      },
    ],
    to: [
      {
        type: 'block',
        blocks: ['gds/grid'],
        transform: (attributes, innerBlocks) => {
          if (attributes.columnCount) {
            attributes.columns = attributes.columnCount;
            delete attributes.columnCount;
          }
          return createBlock(
            'gds/grid',
            attributes,
            innerBlocks.map((innerBlock) => {
              return innerBlock.innerBlocks[0];
            }),
          );
        },
      },
      {
        type: 'block',
        blocks: ['core/columns'],
        transform: (attributes, innerBlocks) => {
          return createBlock(
            'core/columns',
            attributes,
            innerBlocks.map((innerBlock) => {
              return createBlock('core/column', innerBlock.attributes, innerBlock.innerBlocks);
            }),
          );
        },
      },
    ],
  },
});


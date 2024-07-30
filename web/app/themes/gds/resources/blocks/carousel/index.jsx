/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks} from '@wordpress/block-editor';
import {createBlock} from '@wordpress/blocks';

import edit from './edit';
import variations from './variations';
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
        blocks: ['core/group'],
        priority: 20,
        transform: (attributes, innerBlocks) => {
          if (attributes.layout.columnCount) {
            attributes.columnCount = attributes.layout.columnCount;
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
              return createBlock(
                'gds/carousel-item',
                innerBlock.attributes,
                innerBlock.innerBlocks,
              );
            }),
          );
        },
      },
    ],
    to: [
      {
        type: 'block',
        blocks: ['core/group'],
        priority: 20,
        transform: (attributes, innerBlocks) => {
          attributes.layout = {
            type: 'grid',
            minimumColumnWidth: null,
            columnCount: attributes.columnCount,
          };
          return createBlock(
            'core/group',
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
              return createBlock(
                'core/column',
                innerBlock.attributes,
                innerBlock.innerBlocks,
              );
            }),
          );
        },
      },
    ],
  },
});

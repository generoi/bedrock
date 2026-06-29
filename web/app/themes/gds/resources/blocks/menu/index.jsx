/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks} from '@wordpress/block-editor';

import meta from './block.json';
import edit from './edit';
import variations from './variations';

registerBlockType(meta.name, {
  ...meta,
  variations,
  edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

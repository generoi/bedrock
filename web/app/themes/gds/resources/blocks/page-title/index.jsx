/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';

import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  edit() {
    return <h1 {...useBlockProps({})}>Page title placeholder...</h1>;
  },
  save() {
    return <InnerBlocks.Content />;
  },
});

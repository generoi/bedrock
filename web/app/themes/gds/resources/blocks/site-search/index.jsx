/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';

import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  edit() {
    return <div {...useBlockProps({})}>Search</div>;
  },
  save() {
    return <InnerBlocks.Content />;
  },
});

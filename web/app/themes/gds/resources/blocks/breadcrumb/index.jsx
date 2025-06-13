/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';

import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  edit() {
    return <nav {...useBlockProps({})}>Breadcrumb placeholder...</nav>;
  },
  save() {
    return <InnerBlocks.Content />;
  },
});

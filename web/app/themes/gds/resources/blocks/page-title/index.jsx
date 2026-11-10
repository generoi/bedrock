import './style.scss';
/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';

import meta from './block.json';

function Edit() {
  return <h1 {...useBlockProps({})}>Page title placeholder...</h1>;
}

registerBlockType(meta.name, {
  ...meta,
  edit: Edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

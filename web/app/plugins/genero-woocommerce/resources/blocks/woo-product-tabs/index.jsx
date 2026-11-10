import './style.scss';
/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';

import meta from './block.json';

function Edit() {
  return <div {...useBlockProps({})}>Product Tabs placeholder...</div>;
}

registerBlockType(meta.name, {
  ...meta,
  edit: Edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

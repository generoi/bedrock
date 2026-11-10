import './style.scss';
/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';

import meta from './block.json';

function Edit() {
  return <nav {...useBlockProps({})}>Breadcrumb placeholder...</nav>;
}

registerBlockType(meta.name, {
  ...meta,
  edit: Edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

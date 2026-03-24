/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks} from '@wordpress/block-editor';

import './style.scss';
import edit from './edit';
import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

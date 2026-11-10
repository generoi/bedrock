import './style.scss';
/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';

import meta from './block.json';

function Edit() {
  return (
    <nav {...useBlockProps({})}>
      <div className="wp-block-gds-menu-item__link">Language menu</div>
    </nav>
  );
}

registerBlockType(meta.name, {
  ...meta,
  edit: Edit,
  save() {
    return <InnerBlocks.Content />;
  },
});

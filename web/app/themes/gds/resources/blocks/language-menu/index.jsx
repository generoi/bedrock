/** @wordpress */
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks, useBlockProps} from '@wordpress/block-editor';

import meta from './block.json';

registerBlockType(meta.name, {
  ...meta,
  edit() {
    return (
      <nav {...useBlockProps({})}>
        <div className="wp-block-gds-menu-item__link">Language menu</div>
      </nav>
    );
  },
  save() {
    return <InnerBlocks.Content />;
  },
});

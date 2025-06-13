import {addFilter} from '@wordpress/hooks';
import {createHigherOrderComponent} from '@wordpress/compose';

/**
 * Add custom classes we can use to apply styles.
 * @see app/filters.php for frontend side
 */
const withGroupGridColumns = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    if (props.block.name !== 'core/group') {
      return <BlockListBlock {...props} />;
    }
    const layoutType = props.block.attributes?.layout?.type;
    const columnCount = props.block.attributes?.layout?.columnCount;
    if (layoutType !== 'grid' || columnCount === undefined) {
      return <BlockListBlock {...props} />;
    }
    return (
      <BlockListBlock
        {...props}
        wrapperProps={{
          style: {
            '--grid-columns': columnCount,
          },
        }}
      />
    );
  };
}, 'withNamespaceAttribute');

addFilter(
  'editor.BlockListBlock',
  'gds/with-group-grid-columns',
  withGroupGridColumns,
);

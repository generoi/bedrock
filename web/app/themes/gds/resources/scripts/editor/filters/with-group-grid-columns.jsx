import {addFilter} from '@wordpress/hooks';
import {createHigherOrderComponent} from '@wordpress/compose';

/**
 * Add custom classes we can use to apply styles.
 * @see app/BlockFilters/GroupColumnCount.php for frontend side
 */
const withGroupGridColumns = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    if (props.block.name !== 'core/group') {
      return <BlockListBlock {...props} />;
    }
    const {type, columnCount, minimumColumnWidth} =
      props.block.attributes?.layout ?? {};
    if (
      type !== 'grid' ||
      (columnCount === undefined && minimumColumnWidth === undefined)
    ) {
      return <BlockListBlock {...props} />;
    }
    return (
      <BlockListBlock
        {...props}
        wrapperProps={{
          style: {
            ...(columnCount !== undefined && {'--grid-columns': columnCount}),
            ...(minimumColumnWidth !== undefined && {
              '--group-grid-min-width': minimumColumnWidth,
            }),
          },
        }}
      />
    );
  };
}, 'withGroupGridColumns');

addFilter(
  'editor.BlockListBlock',
  'gds/with-group-grid-columns',
  withGroupGridColumns,
);

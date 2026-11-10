import {addFilter} from '@wordpress/hooks';
import {createHigherOrderComponent} from '@wordpress/compose';

const PRESET = 'var:preset|spacing|';

// `var:preset|spacing|block-gutter-l` => `var(--wp--preset--spacing--block-gutter-l)`.
const cssValue = (value) =>
  value?.startsWith(PRESET) ?
    `var(--wp--preset--spacing--${value.slice(PRESET.length)})`
  : value;

/**
 * The columns' Block spacing as variables for core-columns.scss, as on the
 * front end (app/BlockFilters/ColumnsGap.php).
 */
const withColumnsGap = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    const gap = props.block.attributes?.style?.spacing?.blockGap;
    if (props.block.name !== 'core/columns' || !gap) {
      return <BlockListBlock {...props} />;
    }
    const row = typeof gap === 'object' ? gap.top : gap;
    const column = typeof gap === 'object' ? gap.left : gap;
    return (
      <BlockListBlock
        {...props}
        wrapperProps={{
          ...props.wrapperProps,
          style: {
            ...props.wrapperProps?.style,
            ...(row && {'--columns-row-gap': cssValue(row)}),
            ...(column && {'--columns-column-gap': cssValue(column)}),
          },
        }}
      />
    );
  };
}, 'withColumnsGap');

addFilter('editor.BlockListBlock', 'gds/with-columns-gap', withColumnsGap);

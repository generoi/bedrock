import {addFilter} from '@wordpress/hooks';
import {createHigherOrderComponent} from '@wordpress/compose';

const withNamespaceAttribute = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    const namespace = props.block?.attributes?.namespace;
    if (!namespace) {
      return <BlockListBlock {...props} />;
    }

    return (
      <BlockListBlock
        {...props}
        wrapperProps={{
          ...props.wrapperProps,
          'data-namespace': namespace,
        }}
      />
    );
  };
}, 'withNamespaceAttribute');

addFilter(
  'editor.BlockListBlock',
  'gds/with-namespace-attribute',
  withNamespaceAttribute,
);

import {
  InnerBlocks,
} from '@wordpress/block-editor';
import {
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor';
import {useSelect} from '@wordpress/data';

const Edit = (props) => {
  const {clientId} = props;

  const hasInnerBlocks = useSelect(select => {
    const {getBlock} = select('core/block-editor');
    const block = getBlock(clientId);

    return !!(block && block.innerBlocks.length);
  }, [clientId]);

  const blockProps = useBlockProps({
    className: '',
  });

  const innerBlocksProps = useInnerBlocksProps({
    ref: blockProps.ref,
    className: 'wp-block-gds-tab__content',
  }, {
    renderAppender: hasInnerBlocks ? undefined : InnerBlocks.ButtonBlockAppender,
  });

  return (
    <div {...blockProps}>
      <div {...innerBlocksProps}/>
    </div>
  );
};

export default Edit;

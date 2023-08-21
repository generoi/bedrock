import {
  InnerBlocks,
} from '@wordpress/block-editor';
import {
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor';
import {useSelect} from '@wordpress/data';
import {useEffect} from '@wordpress/element';

const Edit = (props) => {
  const {setAttributes, clientId} = props;

  const hasInnerBlocks = useSelect(select => {
    const {getBlock} = select('core/block-editor');
    const block = getBlock(clientId);

    return !!(block && block.innerBlocks.length);
  }, [clientId]);

  const index = useSelect(select => {
    const {getBlockIndex} = select('core/block-editor');
    return getBlockIndex(clientId);
  });

  useEffect(() => {
    setAttributes({index})
  }, [index]);

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

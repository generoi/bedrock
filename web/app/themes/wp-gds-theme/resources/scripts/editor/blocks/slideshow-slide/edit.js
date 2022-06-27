import {
  InnerBlocks,
  useBlockProps,
  __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data';

function BlockEdit({ clientId }) {
  const hasChildBlocks = useSelect(
    (select) => select('core/block-editor').getBlockOrder(clientId).length > 0,
    [clientId]
  );

  const blockProps = useBlockProps({
    className: 'swiper-slide',
  });

  const innerBlockProps = useInnerBlocksProps(blockProps, {
    renderAppender: hasChildBlocks
      ? undefined
      : InnerBlocks.ButtonBlockAppender,
  });

  return (
    <div { ...innerBlockProps } />
  );
}

export default BlockEdit;

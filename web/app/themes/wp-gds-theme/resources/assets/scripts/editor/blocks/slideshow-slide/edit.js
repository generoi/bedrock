import {
  InnerBlocks,
  __experimentalBlock as Block,
} from '@wordpress/block-editor'
import { useSelect } from '@wordpress/data';

function BlockEdit({ clientId }) {
  const hasChildBlocks = useSelect(
    (select) => select('core/block-editor').getBlockOrder(clientId).length > 0,
    [clientId]
  );

  return (
    <InnerBlocks
      renderAppender={ (
        hasChildBlocks ?
          undefined :
          () => <InnerBlocks.ButtonBlockAppender />
      ) }
      __experimentalTagName={ Block.div }
      __experimentalPassedProps={ {
        className: "swiper-slide",
      } }
    />
  );
}

export default BlockEdit;

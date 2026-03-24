import {__} from '@wordpress/i18n';
import {useEffect} from '@wordpress/element';
import {cloneBlock} from '@wordpress/blocks';
import {
  useBlockProps,
  useInnerBlocksProps,
  store as blockEditorStore,
} from '@wordpress/block-editor';
import {useSelect, useDispatch} from '@wordpress/data';
import {Placeholder} from '@wordpress/components';

function Edit({context, clientId}) {
  const productId = context?.postId;

  // Get inner blocks
  const innerBlocks = useSelect(
    (select) => select(blockEditorStore).getBlocks(clientId),
    [clientId],
  );

  const {replaceInnerBlocks} = useDispatch(blockEditorStore);

  const blockProps = useBlockProps({
    className:
      !productId ?
        'wp-block-genero-woocommerce-woo-product__placeholder'
      : undefined,
  });
  const innerBlockProps = useInnerBlocksProps(blockProps, {});

  // Update inner blocks when productId changes
  useEffect(() => {
    if (!productId || innerBlocks.length === 0) {
      return;
    }

    // Recursively update woocommerce/single-product blocks with productId
    const updateBlocksWithProductId = (blocks) => {
      return blocks.map((block) => {
        let updatedBlock = block;

        if (block.name === 'woocommerce/single-product') {
          updatedBlock = cloneBlock(block, {
            ...block.attributes,
            productId,
          });
        }

        if (block.innerBlocks && block.innerBlocks.length > 0) {
          updatedBlock = cloneBlock(
            updatedBlock,
            updatedBlock.attributes,
            updateBlocksWithProductId(block.innerBlocks),
          );
        }

        return updatedBlock;
      });
    };

    // Check if any single-product block needs updating
    const needsUpdate = (blocks) => {
      for (const block of blocks) {
        if (
          block.name === 'woocommerce/single-product' &&
          block.attributes?.productId !== productId
        ) {
          return true;
        }
        if (
          block.innerBlocks &&
          block.innerBlocks.length > 0 &&
          needsUpdate(block.innerBlocks)
        ) {
          return true;
        }
      }
      return false;
    };

    if (needsUpdate(innerBlocks)) {
      const updatedBlocks = updateBlocksWithProductId(innerBlocks);
      replaceInnerBlocks(clientId, updatedBlocks);
    }
  }, [productId, innerBlocks, clientId, replaceInnerBlocks]);

  // Show placeholder if no productId
  if (!productId) {
    return (
      <div {...blockProps}>
        <Placeholder
          label={__('WooCommerce Product', 'genero-woocommerce')}
          instructions={__(
            'Please save the product and create a draft before editing content.',
            'genero-woocommerce',
          )}
        />
      </div>
    );
  }

  // Use productId as key to force re-render when it changes
  return (
    <div key={`woo-product-${productId || 'no-id'}`} {...innerBlockProps} />
  );
}

export default Edit;

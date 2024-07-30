import '@scripts/components/carousel';

/** @wordpress */
import {__} from '@wordpress/i18n';
import {
  BlockControls,
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
  __experimentalBlockVariationPicker as BlockVariationPicker,
  store as blockEditorStore,
} from '@wordpress/block-editor';

import {
  Icon,
  Button,
  PanelBody,
  TextControl,
  RangeControl,
  ToolbarButton,
  ToolbarGroup,
} from '@wordpress/components';

import {
  createBlocksFromInnerBlocksTemplate,
  __experimentalCloneSanitizedBlock as cloneSanitizedBlock,
  store as blocksStore,
} from '@wordpress/blocks';
import {useRef, useEffect} from '@wordpress/element';
import {useSelect, useDispatch} from '@wordpress/data';

const TEMPLATE = [['gds/carousel-item']];
const ALLOWED_BLOCKS = ['gds/carousel-item'];

function BlockEditContainer({attributes, setAttributes, clientId, isSelected}) {
  const {ariaLabel, columnCount} = attributes;

  const ref = useRef();
  const {getBlocks} = useSelect(blockEditorStore);
  const {replaceInnerBlocks, insertBlock} = useDispatch(blockEditorStore);
  let innerBlocks = getBlocks(clientId);

  useEffect(() => {
    ref?.current?.render?.();
  }, [innerBlocks.length]);

  function cloneLastBlock() {
    const lastBlock = innerBlocks.at(-1);
    const lastBlockInnerBlock = cloneSanitizedBlock(lastBlock.innerBlocks[0]);
    lastBlockInnerBlock.innerBlocks = [];

    return cloneSanitizedBlock(lastBlock, {}, [lastBlockInnerBlock]);
  }

  const updateChildren = (newCount) => {
    let innerBlocks = getBlocks(clientId);
    const previousCount = innerBlocks.length;
    if (newCount > previousCount) {
      innerBlocks = [
        ...innerBlocks,
        ...Array.from({length: newCount - previousCount}).map(() =>
          cloneLastBlock(),
        ),
      ];
      replaceInnerBlocks(clientId, innerBlocks);
    } else if (newCount < previousCount) {
      // @TODO maybe we can remove empty items?
    }
    setAttributes({columnCount: newCount});
  };

  const controls = (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            label={__('Add slide')}
            icon="plus"
            onClick={() => {
              const innerBlocks = getBlocks(clientId);
              insertBlock(
                cloneLastBlock(),
                innerBlocks.length || 0,
                clientId,
                false,
              );
            }}
          />
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
        <PanelBody title={__('Carousel Settings')}>
          <RangeControl
            label={__('Columns visible')}
            value={columnCount}
            onChange={(value) => updateChildren(value)}
            min={1}
            max={4}
          />
        </PanelBody>
        <PanelBody initialOpen={false} title={__('Accessibility')}>
          <TextControl
            label={__('Label')}
            value={ariaLabel}
            onChange={(ariaLabel) => setAttributes({ariaLabel})}
          />
        </PanelBody>
      </InspectorControls>
    </>
  );

  const blockProps = useBlockProps({});
  const innerBlockProps = useInnerBlocksProps(
    {},
    {
      orientation: 'horizontal',
      template: TEMPLATE,
      allowedBlocks: ALLOWED_BLOCKS,
      renderAppender: () => {
        const isParentOfSelectedBlock = useSelect((select) =>
          select('core/block-editor').hasSelectedInnerBlock(clientId, true),
        );

        return (
          <>
            {(isSelected || isParentOfSelectedBlock) && (
              <Button
                className="block-editor-button-block-appender"
                onClick={() => {
                  const innerBlocks = getBlocks(clientId);
                  insertBlock(
                    cloneLastBlock(),
                    innerBlocks.length || 0,
                    clientId,
                    false,
                  );
                }}
              >
                <Icon icon="plus-alt2" />
              </Button>
            )}
          </>
        );
      },
    },
  );

  return (
    <>
      {controls}
      <div {...blockProps}>
        <gds-carousel
          class="wp-block-gds-carousel__carousel"
          column-count={columnCount}
          ref={ref}
        >
          {innerBlockProps.children}
          <i slot="icon-prev" className="fa fa-solid fa-chevron-left" />
          <i slot="icon-next" className="fa fa-solid fa-chevron-right" />
        </gds-carousel>
      </div>
    </>
  );
}

function Placeholder({clientId, name, setAttributes}) {
  const {blockType, defaultVariation, variations} = useSelect(
    (select) => {
      const {getBlockVariations, getBlockType, getDefaultBlockVariation} =
        select(blocksStore);

      return {
        blockType: getBlockType(name),
        defaultVariation: getDefaultBlockVariation(name, 'block'),
        variations: getBlockVariations(name, 'block'),
      };
    },
    [name],
  );

  const {replaceInnerBlocks} = useDispatch(blockEditorStore);
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <BlockVariationPicker
        icon={blockType?.icon?.src}
        label={blockType?.title}
        variations={variations}
        onSelect={(nextVariation = defaultVariation) => {
          if (nextVariation.attributes) {
            setAttributes(nextVariation.attributes);
          }
          if (nextVariation.innerBlocks) {
            replaceInnerBlocks(
              clientId,
              createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks),
              true,
            );
          }
        }}
      />
    </div>
  );
}

const BlockEdit = (props) => {
  const {clientId} = props;
  const hasInnerBlocks = useSelect(
    (select) => select(blockEditorStore).getBlocks(clientId).length > 0,
    [clientId],
  );
  const Component = hasInnerBlocks ? BlockEditContainer : Placeholder;
  return <Component {...props} />;
};

export default BlockEdit;

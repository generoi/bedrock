import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
  __experimentalBlockVariationPicker as BlockVariationPicker,
  store as blockEditorStore,
} from '@wordpress/block-editor'

import {
  Icon,
  Button,
  PanelBody,
  RangeControl,
} from '@wordpress/components';

import {
  createBlocksFromInnerBlocksTemplate,
  __experimentalCloneSanitizedBlock as cloneSanitizedBlock,
  store as blocksStore,
} from '@wordpress/blocks';

import { useSelect, useDispatch } from '@wordpress/data';

import { __ } from '@wordpress/i18n';

const TEMPLATE = [
  ['gds/media-card'],
  ['gds/media-card'],
  ['gds/media-card'],
];

const ALLOWED_BLOCKS = [
  'gds/media-card',
];

function BlockEditContainer({
  attributes,
  setAttributes,
  isSelected,
  clientId,
}) {
  const {
    columns,
    allowedBlocks,
  } = attributes;

  const { getBlocks } = useSelect(blockEditorStore);
  const { insertBlock } = useDispatch( blockEditorStore );

  function cloneLastBlock() {
    const innerBlocks = getBlocks(clientId);
    const lastBlock = innerBlocks.at(-1);
    const lastBlockInnerBlock = cloneSanitizedBlock(lastBlock.innerBlocks[0]);
    lastBlockInnerBlock.innerBlocks = [];

    return cloneSanitizedBlock(lastBlock, {}, [
      lastBlockInnerBlock,
    ]);
  }

  const blockProps = useBlockProps({
    className: `has-${columns}-columns`,
  });

  const innerBlockProps = useInnerBlocksProps(blockProps, {
    orientation: 'horizontal',
    template: TEMPLATE,
    allowedBlocks,
    renderAppender: () => {
      const isParentOfSelectedBlock = useSelect(
        (select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true)
      );

      return (
        <>
          {(isSelected || isParentOfSelectedBlock) && (
            <Button
              className="block-editor-button-block-appender"
              onClick={ () => {
                const innerBlocks = getBlocks(clientId);
                insertBlock(cloneLastBlock(), innerBlocks.length || 0, clientId, false);
              } }
            >
              <Icon icon="plus-alt2"/>
            </Button>
          )}
        </>
      );
    },
  });

  const controls = (
    <>
      <InspectorControls>
        <PanelBody title={ __('Grid settings') }>
          <RangeControl
            label={ __('Columns per row') }
            value={ columns }
            onChange={ (columns) => setAttributes({columns}) }
            min={ 1 }
            max={ 4 }
          />
        </PanelBody>
      </InspectorControls>
    </>
  );

  return (
    <>
      {controls}
      <div {...innerBlockProps}/>
    </>
  );
}

function Placeholder({clientId, name, setAttributes}) {
  const { blockType, defaultVariation, variations } = useSelect(
    (select) => {
      const {
        getBlockVariations,
        getBlockType,
        getDefaultBlockVariation,
      } = select(blocksStore);

      return {
        blockType: getBlockType(name),
        defaultVariation: getDefaultBlockVariation(name, 'block'),
        variations: getBlockVariations(name, 'block'),
      };
    },
    [name]
  );

  const { replaceInnerBlocks } = useDispatch(blockEditorStore);
  const blockProps = useBlockProps();

  return (
    <div { ...blockProps }>
      <BlockVariationPicker
        icon={ blockType?.icon?.src }
        label={ blockType?.title }
        variations={ variations }
        onSelect={ (nextVariation = defaultVariation) => {
          if (nextVariation.attributes) {
            setAttributes(nextVariation.attributes);
          }
          if (nextVariation.innerBlocks) {
            replaceInnerBlocks(
              clientId,
              createBlocksFromInnerBlocksTemplate(
                nextVariation.innerBlocks
              ),
              true
            );
          }
        } }
      />
    </div>
  );
}

const BlockEdit = (props) => {
  const { clientId } = props;
  const hasInnerBlocks = useSelect(
    (select) => select(blockEditorStore).getBlocks(clientId).length > 0,
    [clientId]
  );
  const Component = hasInnerBlocks ? BlockEditContainer : Placeholder;
  return <Component { ...props } />;
};

export default BlockEdit;

import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
  __experimentalBlockVariationPicker as BlockVariationPicker,
  store as blockEditorStore,
} from '@wordpress/block-editor'

import {
  PanelBody,
  RangeControl,
} from '@wordpress/components';

import {
  createBlocksFromInnerBlocksTemplate,
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
}) {
  const {
    columns,
    allowedBlocks,
  } = attributes;

  const blockProps = useBlockProps({
    className: `has-${columns}-columns`,
  });
  const innerBlockProps = useInnerBlocksProps(blockProps, {
    template: TEMPLATE,
    allowedBlocks,
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

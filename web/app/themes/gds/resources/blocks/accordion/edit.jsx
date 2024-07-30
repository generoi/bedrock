import {__} from '@wordpress/i18n';
import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
  ButtonBlockAppender,
} from '@wordpress/block-editor';
import {PanelBody, ToggleControl} from '@wordpress/components';
import {useSelect} from '@wordpress/data';

const TEMPLATE = [['gds/accordion-item']];

const ALLOWED_BLOCKS = ['gds/accordion-item'];

function Edit({attributes, setAttributes, isSelected, clientId}) {
  const {allowMultiple} = attributes;

  const blockProps = useBlockProps();
  const innerBlockProps = useInnerBlocksProps(
    {
      allowMultiple,
    },
    {
      template: TEMPLATE,
      allowedBlocks: ALLOWED_BLOCKS,
      renderAppender: () => {
        const isParentOfSelectedBlock = useSelect((select) =>
          select('core/block-editor').hasSelectedInnerBlock(clientId, true),
        );

        return (
          <>
            {(isSelected || isParentOfSelectedBlock) && (
              <ButtonBlockAppender rootClientId={clientId} />
            )}
          </>
        );
      },
    },
  );

  const controls = (
    <InspectorControls>
      <PanelBody title={__('Accordion')}>
        <ToggleControl
          label={__('Allow opening multiple at the same time')}
          checked={allowMultiple || false}
          onChange={(allowMultiple) => setAttributes({allowMultiple})}
        />
      </PanelBody>
    </InspectorControls>
  );

  return (
    <>
      {controls}
      <div {...blockProps}>
        <gds-accordion {...innerBlockProps} />
      </div>
    </>
  );
}

export default Edit;

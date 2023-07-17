import {__} from '@wordpress/i18n';
import {
  useBlockProps,
  useInnerBlocksProps,
  RichText,
} from '@wordpress/block-editor';

const TEMPLATE = [
  ['core/paragraph'],
];

const ALLOWED_BLOCKS = [
  'core/paragraph',
  'core/heading',
  'core/buttons',
  'core/button',
  'core/image',
  'core/video',
  'core/list',
];

function Edit({attributes, setAttributes}) {
  const {
    label,
  } = attributes;

  const blockProps = useBlockProps({});

  const innerBlockProps = useInnerBlocksProps({}, {
    template: TEMPLATE,
    allowedBlocks: ALLOWED_BLOCKS,
  });

  return (
    <>
      <div {...blockProps}>
        <gds-tabs-item>
          <RichText
            tagName="span"
            slot="label"
            value={label}
            onChange={(label) => setAttributes({ label })}
            placeholder={__('Write label…')}
          />
          <div {...innerBlockProps}/>
        </gds-tabs-item>
      </div>
    </>
  );
}

export default Edit;

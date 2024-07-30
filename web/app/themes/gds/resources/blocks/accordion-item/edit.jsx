import {__} from '@wordpress/i18n';
import {useRef} from '@wordpress/element';
import {
  useBlockProps,
  useInnerBlocksProps,
  RichText,
} from '@wordpress/block-editor';

const TEMPLATE = [['core/paragraph']];

const ALLOWED_BLOCKS = [
  'core/paragraph',
  'core/heading',
  'core/buttons',
  'core/button',
  'core/image',
  'core/video',
  'core/list',
  'core/table',
];

function Edit({attributes, setAttributes}) {
  const {label} = attributes;

  const blockProps = useBlockProps({});

  const innerBlockProps = useInnerBlocksProps(
    {},
    {
      template: TEMPLATE,
      allowedBlocks: ALLOWED_BLOCKS,
    },
  );

  const ref = useRef();

  return (
    <>
      <div {...blockProps}>
        <gds-accordion-item ref={ref} expanded>
          <RichText
            tagName="div"
            slot="label"
            value={label}
            onChange={(label) => setAttributes({label})}
            onClick={() => {
              // Force expanded since stopPropagation doesnt work.
              ref.current.setAttribute('expanded', '');
            }}
            placeholder={__('Write heading…')}
          />
          <i slot="icon" className="fa fa-solid fa-chevron-down" />
          <div {...innerBlockProps} />
        </gds-accordion-item>
      </div>
    </>
  );
}

export default Edit;

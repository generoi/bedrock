import {__} from '@wordpress/i18n';
import {
  useBlockProps,
  useInnerBlocksProps,
} from '@wordpress/block-editor';

const TEMPLATE = [
  ['core/paragraph'],
];

function Edit({attributes}) {
	const {
		templateLock,
		allowedBlocks,
	} = attributes;

  const blockProps = useBlockProps({});
  const innerBlockProps = useInnerBlocksProps(blockProps, {
    template: TEMPLATE,
    templateLock,
    allowedBlocks,
  });

  return (
    <div {...innerBlockProps} />
  );
}

export default Edit;

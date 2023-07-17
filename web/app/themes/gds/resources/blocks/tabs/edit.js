import {__, sprintf} from '@wordpress/i18n';
import {
  useBlockProps,
  useInnerBlocksProps,
  ButtonBlockAppender,
  BlockControls,
} from '@wordpress/block-editor';

import {useSelect, useDispatch} from '@wordpress/data';
import {createBlock} from '@wordpress/blocks';
import {ToolbarButton, ToolbarGroup} from '@wordpress/components';
import {useEffect, useState, useRef} from '@wordpress/element';


const TEMPLATE = [
  ['gds/tabs-item'],
];

const ALLOWED_BLOCKS = [
  'gds/tabs-item',
];

function Controls({
  clientId,
}) {


  const index = children?.findIndex(({clientId}) => clientId === activeTab);

  return (
    <BlockControls>
      <ToolbarGroup>
        <ToolbarButton
          label={__('Delete tab', 'gds')}
          icon="trash"
          disabled={children?.length < 2}
          onClick={() => deleteTab(activeTab)}
        />

        <ToolbarButton
          label={__('Move tab left', 'gds')}
          icon="arrow-left-alt2"
          disabled={0 === index}
          onClick={() => moveTab(activeTab, index - 1)}
        />

        <ToolbarButton
          label={__('Move tab right', 'gds')}
          icon="arrow-right-alt2"
          disabled={children?.length - 1 === index}
          onClick={() => moveTab(activeTab, index + 1)}
        />
      </ToolbarGroup>
    </BlockControls>
  );
}

function Edit({
  attributes,
  setAttributes,
  isSelected,
  clientId,
} = props) {
  const {
    allowMultiple,
  } = attributes;

  const children = useSelect(select => {
    const { getBlock } = select('core/block-editor');
    return getBlock(clientId).innerBlocks;
  });

  const [activeTab, setActiveTab] = useState(null);
  const activeTabIndex = children?.findIndex(({clientId}) => clientId === activeTab);

  const {
    insertBlock,
    removeBlock,
    // selectBlock,
    moveBlockToPosition,
    updateBlockAttributes,
  } = useDispatch('core/block-editor');

  const moveTab = (blockId, position) => {
    const blockClienId = children.filter(block => block.clientId === blockId)[0]?.clientId;
    if (blockClienId) {
      moveBlockToPosition(blockClienId, clientId, clientId, position);
    }
  };

  const deleteTab = (blockId) => {
    if (0 < children?.length) {
      const block = children.filter(block => block.clientId === blockId)[0];
      removeBlock(block.clientId, false);
      if (activeTab === blockId) {
        setActiveTab(null);
      }
    }
  };

  const addTab = () => {
    const itemBlock = createBlock('gds/tabs-item', {title: sprintf(__('Tab #%d', 'gds'), children.length + 1)});
    insertBlock(itemBlock, (children?.length) || 0, clientId, false);
  };

  // Activate the first tab when no tabs are selected.
  useEffect(() => {
    // if (children?.length === 0 )
    // if (0 < children?.length && ('' === activeTab || 0 === children?.filter(block => block.clientId === activeTab).length)) {
    //   toggleActiveTab(children[0].clientId);
    // }

    // setTabs();
  }, [children]);


  const controls = (
    <BlockControls>
      <ToolbarGroup>
        <ToolbarButton
          label={__('Delete tab', 'gds')}
          icon="trash"
          disabled={children?.length < 2}
          onClick={() => deleteTab(activeTab)}
        />

        <ToolbarButton
          label={__('Move tab left', 'gds')}
          icon="arrow-left-alt2"
          disabled={activeTabIndex === 0}
          onClick={() => moveTab(activeTab, activeTabIndex - 1)}
        />

        <ToolbarButton
          label={__('Move tab right', 'gds')}
          icon="arrow-right-alt2"
          disabled={activeTabIndex === children?.length - 1}
          onClick={() => moveTab(activeTab, activeTabIndex + 1)}
        />
      </ToolbarGroup>
    </BlockControls>
  );


  const blockProps = useBlockProps();
  const innerBlockProps = useInnerBlocksProps({
    allowMultiple,
  }, {
    template: TEMPLATE,
    allowedBlocks: ALLOWED_BLOCKS,
    orientation: 'horizontal',
    renderAppender: () => {
      const isParentOfSelectedBlock = useSelect(
        (select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true)
      );

      return (
        <>
          {(isSelected || isParentOfSelectedBlock) && (
            <ButtonBlockAppender
              rootClientId={clientId}
            />
          )}
        </>
      );
    },
  });

  return (
    <>
      {controls}

      <div {...blockProps}>
        <gds-tabs {...innerBlockProps} />
      </div>
    </>
  );
}

export default Edit;

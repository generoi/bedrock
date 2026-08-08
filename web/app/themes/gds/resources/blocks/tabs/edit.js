import classnames from 'classnames';
import {__, sprintf} from '@wordpress/i18n';
import {
  RichText,
  useBlockProps,
  useInnerBlocksProps,
  BlockControls,
} from '@wordpress/block-editor';
import {
  Icon,
  ToolbarButton,
  ToolbarGroup,
} from '@wordpress/components';
import {createBlock} from '@wordpress/blocks';
import {useSelect, useDispatch} from '@wordpress/data';
import {useEffect, useState, useRef} from '@wordpress/element';

const Edit = (props) => {
  const {isSelected, clientId} = props;
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState('');

  const children = useSelect(select => {
    const {getBlock} = select('core/block-editor');
    return getBlock(clientId).innerBlocks;
  });

  const isParentOfSelectedBlock = useSelect(
    (select) => select('core/block-editor').hasSelectedInnerBlock(clientId, true),
  );

  const {
    insertBlock,
    removeBlock,
    // selectBlock,
    moveBlockToPosition,
    updateBlockAttributes,
  } = useDispatch('core/block-editor');

  // const selectTab = (blockId) => {
  //   if (0 < children?.length) {
  //     const block = children.filter(block => block.clientId === blockId)[0];
  //     selectBlock(block.clientId);
  //   }
  // };

  const toggleActiveTab = (blockId) => {
    if (contentRef.current) {
      children.forEach(block => {
        const blockContent = contentRef.current.querySelector(`#block-${block.clientId} .wp-block-gds-tab__content`);
        blockContent?.classList.toggle('active', block.clientId === blockId);
      });

      setActiveTab(blockId);
    }
  };

  const moveTab = (blockId, position) => {
    const blockClientId = children.filter(block => block.clientId === blockId)[0]?.clientId;
    if (blockClientId) {
      moveBlockToPosition(blockClientId, clientId, clientId, position);
    }
  };

  const deleteTab = (blockId) => {
    if (0 < children?.length) {
      const block = children.filter(block => block.clientId === blockId)[0];
      removeBlock(block.clientId, false);
      if (activeTab === blockId) {
        setActiveTab('');
      }
    }
  };

  const addTab = () => {
    const itemBlock = createBlock('gds/tab', {label: sprintf(__('Tab #%d'), children.length + 1)});
    insertBlock(itemBlock, (children?.length) || 0, clientId, false);
  };

  useEffect(() => {
    // Handle breakpoint
    const activeContent = contentRef.current.querySelector(`#block-${activeTab} .wp-block-gds-tab__content.active`)

    if (activeTab && !activeContent) {
      toggleActiveTab(activeTab);
    }
  });

  useEffect(() => {
    // Activate the first tab when no tabs are selected
    if (0 < children?.length && ('' === activeTab || 0 === children?.filter(block => block.clientId === activeTab).length)) {
      toggleActiveTab(children[0].clientId);
    }
  }, [children]);

  const Controls = () => {
    const index = children?.findIndex(({clientId}) => clientId === activeTab);

    return (
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            label={__('Delete tab')}
            icon="trash"
            disabled={children?.length < 2}
            onClick={() => deleteTab(activeTab)}
          />

          <ToolbarButton
            label={__('Move tab left')}
            icon="arrow-left-alt2"
            disabled={0 === index}
            onClick={() => moveTab(activeTab, index - 1)}
          />

          <ToolbarButton
            label={__('Move tab right')}
            icon="arrow-right-alt2"
            disabled={children?.length - 1 === index}
            onClick={() => moveTab(activeTab, index + 1)}
          />
        </ToolbarGroup>
      </BlockControls>
    );
  };

  const blockProps = useBlockProps({
    className: '',
  });

  const innerBlocksProps = useInnerBlocksProps({
    ref: contentRef,
    className: 'wp-block-gds-tabs__panels',
  }, {
    orientation: 'horizontal',
    renderAppender: false,
    allowedBlocks: ['gds/tab'],
    template: [
      ['gds/tab', {label: sprintf(__('Tab #%d'), 1)}],
    ],
  });

  return (
    <>
      <Controls/>

      <div {...blockProps}>
        <div className="wp-block-buttons">
          {children?.map((tab, index) => {
            return (
              <div className="wp-block-button" key={index}>
                <button
                  className={classnames('wp-block-button__link', {'active': tab.clientId === activeTab})}
                  onClick={() => toggleActiveTab(tab.clientId)}
                >
                  <RichText
                    tagName="span"
                    value={tab.attributes.label}
                    allowedFormats={[]}
                    onChange={nextLabel => {
                      updateBlockAttributes(tab.clientId, {label: nextLabel});
                    }}
                    placeholder={__('Enter label')}
                  />
                </button>
              </div>
            );
          }) || ''}

          {(isSelected || isParentOfSelectedBlock || 0 === children.length) && (
            <li className="wp-block-button">
              <button className="wp-block-button__link has-secondary-background-color has-background" onClick={addTab}>
                <Icon icon="plus-alt2"/>
              </button>
            </li>
          )}
        </div>

        <div {...innerBlocksProps}/>
      </div>
    </>
  );
};

export default Edit;
